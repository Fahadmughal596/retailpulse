/**
 * RetailPulse AI — Offline-First Synchronization Engine
 * Stack: React Native/Expo · MMKV · Supabase
 */

import { useEffect, useRef, useCallback, useState } from "react";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { MMKV } from "react-native-mmkv";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// ─── Constants ────────────────────────────────────────────────────────────────
const QUEUE_KEY = "rp_sync_queue_v2";
const MAX_RETRY_ATTEMPTS = 5;
const RETRY_BACKOFF_MS = [2_000, 5_000, 15_000, 30_000, 60_000];
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// ─── Storage (MMKV → <1ms reads on device) ───────────────────────────────────
const storage = new MMKV({ id: "retailpulse-offline-store" });
const persist = {
  get: (key: string) => storage.getString(key),
  set: (key: string, val: string) => storage.set(key, val),
  delete: (key: string) => storage.delete(key),
};

// ─── Types ────────────────────────────────────────────────────────────────────
export type TransactionStatus = "pending" | "syncing" | "synced" | "failed";

export interface TransactionItem {
  sku_id: string;
  product_name: string;
  brand_id: string;
  quantity: number;
  unit_price: number;
  category: string;
}

export interface KiryanaTransaction {
  id: string; // nanoid / crypto.randomUUID
  store_id: string;
  cashier_id: string;
  items: TransactionItem[];
  total_amount: number;
  payment_method: "cash" | "easypaisa" | "jazzcash" | "card";
  timestamp: string; // ISO-8601
  location?: { lat: number; lng: number };
  receipt_image_url?: string;
}

export interface QueuedTransaction {
  transaction: KiryanaTransaction;
  status: TransactionStatus;
  attempts: number;
  last_attempted_at: string | null;
  queued_at: string;
  error?: string;
}

export type SyncStatus =
  | "idle"
  | "offline"
  | "syncing"
  | "all_synced"
  | "partial_failure";

// ─── Queue Helpers ────────────────────────────────────────────────────────────
function loadQueue(): QueuedTransaction[] {
  try {
    return JSON.parse(persist.get(QUEUE_KEY) ?? "[]");
  } catch {
    return [];
  }
}
function saveQueue(q: QueuedTransaction[]) {
  persist.set(QUEUE_KEY, JSON.stringify(q));
}
function enqueue(tx: KiryanaTransaction) {
  const q = loadQueue();
  q.push({
    transaction: tx,
    status: "pending",
    attempts: 0,
    last_attempted_at: null,
    queued_at: new Date().toISOString(),
  });
  saveQueue(q);
}
function removeById(id: string) {
  saveQueue(loadQueue().filter((q) => q.transaction.id !== id));
}
function updateEntry(id: string, patch: Partial<QueuedTransaction>) {
  saveQueue(loadQueue().map((q) =>
    q.transaction.id === id ? { ...q, ...patch } : q
  ));
}

// ─── Supabase Singleton ───────────────────────────────────────────────────────
let _supabase: SupabaseClient | null = null;
function getSupabase(): SupabaseClient {
  if (!_supabase) {
    _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  }
  return _supabase;
}

// ─── Push Single Transaction ──────────────────────────────────────────────────
async function pushTransaction(
  entry: QueuedTransaction
): Promise<"success" | "retry" | "dead"> {
  const { transaction: tx, attempts } = entry;
  try {
    const { error } = await getSupabase()
      .from("transactions")
      .upsert(
        {
          id: tx.id,
          store_id: tx.store_id,
          cashier_id: tx.cashier_id,
          items: tx.items,
          total_amount: tx.total_amount,
          payment_method: tx.payment_method,
          recorded_at: tx.timestamp,
          location: tx.location ?? null,
          receipt_image_url: tx.receipt_image_url ?? null,
          synced_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );
    if (error) throw new Error(error.message);
    return "success";
  } catch (err) {
    const next = attempts + 1;
    updateEntry(tx.id, {
      status: next >= MAX_RETRY_ATTEMPTS ? "failed" : "pending",
      attempts: next,
      last_attempted_at: new Date().toISOString(),
      error: err instanceof Error ? err.message : String(err),
    });
    return next >= MAX_RETRY_ATTEMPTS ? "dead" : "retry";
  }
}

// ─── Flush Queue ──────────────────────────────────────────────────────────────
async function flushQueue(): Promise<{ synced: number; failed: number }> {
  const queue = loadQueue().filter((q) => q.status !== "failed");
  let synced = 0;
  let failed = 0;

  for (const entry of queue) {
    updateEntry(entry.transaction.id, {
      status: "syncing",
      last_attempted_at: new Date().toISOString(),
    });
    if (entry.attempts > 0) {
      await new Promise((r) =>
        setTimeout(r, RETRY_BACKOFF_MS[Math.min(entry.attempts - 1, 4)])
      );
    }
    const result = await pushTransaction({ ...entry, status: "syncing" });
    if (result === "success") { removeById(entry.transaction.id); synced++; }
    else if (result === "dead") failed++;
  }
  return { synced, failed };
}

// ─── React Hook ───────────────────────────────────────────────────────────────
export interface UseSyncEngineReturn {
  syncStatus: SyncStatus;
  pendingCount: number;
  failedCount: number;
  recordTransaction: (tx: KiryanaTransaction) => Promise<void>;
  manualSync: () => Promise<void>;
}

export function useSyncEngine(): UseSyncEngineReturn {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("idle");
  const [pendingCount, setPendingCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const isOnlineRef = useRef(false);
  const isSyncingRef = useRef(false);

  const refreshCounts = useCallback(() => {
    const q = loadQueue();
    setPendingCount(q.filter((e) => e.status === "pending").length);
    setFailedCount(q.filter((e) => e.status === "failed").length);
  }, []);

  const runSync = useCallback(async () => {
    if (isSyncingRef.current || !isOnlineRef.current) return;
    isSyncingRef.current = true;
    setSyncStatus("syncing");
    try {
      const { synced, failed } = await flushQueue();
      const remaining = loadQueue().filter(
        (q) => q.status === "pending"
      ).length;
      console.info(`[SyncEngine] synced:${synced} failed:${failed} remaining:${remaining}`);
      if (remaining === 0 && failed === 0) setSyncStatus("all_synced");
      else if (failed > 0) setSyncStatus("partial_failure");
      else setSyncStatus("idle");
    } catch (err) {
      console.error("[SyncEngine] flush error:", err);
      setSyncStatus("partial_failure");
    } finally {
      isSyncingRef.current = false;
      refreshCounts();
    }
  }, [refreshCounts]);

  const recordTransaction = useCallback(
    async (tx: KiryanaTransaction) => {
      enqueue(tx);
      refreshCounts();
      if (isOnlineRef.current) await runSync();
      else setSyncStatus("offline");
    },
    [runSync, refreshCounts]
  );

  const manualSync = useCallback(async () => {
    if (isOnlineRef.current) await runSync();
  }, [runSync]);

  useEffect(() => {
    refreshCounts();
    const unsub = NetInfo.addEventListener((state: NetInfoState) => {
      const online =
        state.isConnected === true && state.isInternetReachable === true;
      const wasOffline = !isOnlineRef.current;
      isOnlineRef.current = online;
      if (online) {
        setSyncStatus(wasOffline ? "syncing" : "idle");
        setTimeout(() => runSync(), 800);
      } else {
        setSyncStatus("offline");
      }
    });
    return () => unsub();
  }, [runSync, refreshCounts]);

  return { syncStatus, pendingCount, failedCount, recordTransaction, manualSync };
}

// ─── UI Meta ──────────────────────────────────────────────────────────────────
export const SYNC_STATUS_META: Record<
  SyncStatus,
  { label: string; color: string; emoji: string }
> = {
  idle:            { label: "Up to date",      color: "#22C55E", emoji: "✅" },
  offline:         { label: "Offline – queued", color: "#F59E0B", emoji: "📡" },
  syncing:         { label: "Syncing…",         color: "#00D4FF", emoji: "🔄" },
  all_synced:      { label: "All synced",       color: "#22C55E", emoji: "☁️" },
  partial_failure: { label: "Sync issues",      color: "#EF4444", emoji: "⚠️" },
};
