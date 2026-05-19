/**
 * RetailPulse AI — Retailer Dashboard UI
 * Stack: React Native · NativeWind (Tailwind) · Expo Linear Gradient
 *
 * Components:
 *  - SyncStatusBadge        → animated connectivity indicator
 *  - StreakCard              → glassmorphic daily streak display
 *  - MilestoneTracker       → FMCG gift hamper progress bar
 *  - QuickScanFAB           → Electric-Blue glow FAB
 *  - RetailerDashboard      → composed screen
 */

import React, { useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  Pressable,
  Dimensions,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import {
  Zap,
  Flame,
  Gift,
  QrCode,
  CloudOff,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from "lucide-react-native";

import {
  useSyncEngine,
  SyncStatus,
  SYNC_STATUS_META,
} from "@/lib/sync/offlineSyncEngine";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  bg:        "#0F1117",
  surface:   "rgba(255,255,255,0.05)",
  border:    "rgba(255,255,255,0.08)",
  blue:      "#00D4FF",
  purple:    "#8B5CF6",
  green:     "#22C55E",
  amber:     "#F59E0B",
  red:       "#EF4444",
  textPri:   "#F8FAFC",
  textSec:   "#64748B",
  textMuted: "#334155",
} as const;

const { width: SCREEN_W } = Dimensions.get("window");

// ─── Sync Status Badge ────────────────────────────────────────────────────────
interface SyncBadgeProps {
  status: SyncStatus;
  pending: number;
}
export function SyncStatusBadge({ status, pending }: SyncBadgeProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const meta = SYNC_STATUS_META[status];

  useEffect(() => {
    if (status === "syncing") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 0.3, duration: 600, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1,   duration: 600, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [status, pulseAnim]);

  const Icon =
    status === "offline"         ? CloudOff     :
    status === "syncing"         ? Loader2      :
    status === "partial_failure" ? AlertTriangle :
    CheckCircle2;

  return (
    <View style={[styles.badge, { borderColor: `${meta.color}30` }]}>
      <Animated.View style={{ opacity: pulseAnim }}>
        <Icon size={13} color={meta.color} />
      </Animated.View>
      <Text style={[styles.badgeText, { color: meta.color }]}>
        {meta.emoji} {meta.label}
        {pending > 0 ? `  ·  ${pending} queued` : ""}
      </Text>
    </View>
  );
}

// ─── Streak Card ──────────────────────────────────────────────────────────────
interface StreakCardProps {
  streakDays: number;
  storeName: string;
  todayTransactions: number;
}
export function StreakCard({ streakDays, storeName, todayTransactions }: StreakCardProps) {
  const scaleAnim = useRef(new Animated.Value(0.92)).current;
  const glowAnim  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, friction: 6, tension: 80, useNativeDriver: true }),
      Animated.timing(glowAnim, { toValue: 1, duration: 800, useNativeDriver: false }),
    ]).start();
  }, [scaleAnim, glowAnim]);

  const glowOpacity = glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.5] });

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      {/* Glow halo */}
      <Animated.View
        style={[
          styles.streakGlow,
          { opacity: glowOpacity, shadowColor: C.purple },
        ]}
      />

      <BlurView intensity={18} tint="dark" style={styles.glassCard}>
        <LinearGradient
          colors={["rgba(139,92,246,0.18)", "rgba(0,212,255,0.08)", "rgba(0,0,0,0)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Header row */}
        <View style={styles.row}>
          <View>
            <Text style={styles.storeLabel}>{storeName}</Text>
            <Text style={styles.cardSubtitle}>Daily Streak</Text>
          </View>
          <View style={styles.streakBadge}>
            <Flame size={22} color={C.amber} fill={C.amber} />
            <Text style={styles.streakNumber}>{streakDays}</Text>
          </View>
        </View>

        {/* Hero number */}
        <View style={styles.streakHeroRow}>
          <Text style={styles.streakHero}>{streakDays}-Day Streak 🔥</Text>
        </View>
        <Text style={styles.streakDesc}>
          You've logged transactions every day for{" "}
          <Text style={{ color: C.amber, fontWeight: "700" }}>{streakDays} days</Text>.
          Don't break the chain!
        </Text>

        {/* Today's count */}
        <View style={[styles.row, { marginTop: 18 }]}>
          <Text style={styles.textSec}>Today's transactions</Text>
          <View style={[styles.chip, { backgroundColor: `${C.green}18`, borderColor: `${C.green}30` }]}>
            <Text style={{ color: C.green, fontWeight: "700", fontSize: 13 }}>
              {todayTransactions} logged ✓
            </Text>
          </View>
        </View>
      </BlurView>
    </Animated.View>
  );
}

// ─── Milestone Tracker ────────────────────────────────────────────────────────
interface MilestoneTrackerProps {
  currentTx: number;
  targetTx: number;
  milestoneName: string;
  milestoneEmoji: string;
}
export function MilestoneTracker({
  currentTx,
  targetTx,
  milestoneName,
  milestoneEmoji,
}: MilestoneTrackerProps) {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const progress = Math.min(currentTx / targetTx, 1);
  const remaining = Math.max(targetTx - currentTx, 0);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  }, [progress, progressAnim]);

  const barWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const barColor = progressAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [C.blue, C.purple, C.green],
  });

  return (
    <BlurView intensity={14} tint="dark" style={[styles.glassCard, { marginTop: 16 }]}>
      <LinearGradient
        colors={["rgba(0,212,255,0.10)", "rgba(139,92,246,0.06)", "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Title row */}
      <View style={styles.row}>
        <View>
          <Text style={styles.cardSubtitle}>Next Milestone</Text>
          <Text style={[styles.storeLabel, { marginTop: 2 }]}>
            {milestoneEmoji} {milestoneName}
          </Text>
        </View>
        <View style={[styles.chip, { backgroundColor: `${C.blue}18`, borderColor: `${C.blue}30` }]}>
          <Gift size={13} color={C.blue} />
          <Text style={{ color: C.blue, fontWeight: "700", fontSize: 12, marginLeft: 5 }}>
            {Math.round(progress * 100)}%
          </Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <Animated.View
          style={[
            styles.progressFill,
            { width: barWidth, backgroundColor: barColor },
          ]}
        />
        {/* Milestone notches */}
        {[0.25, 0.5, 0.75].map((mark) => (
          <View
            key={mark}
            style={[
              styles.notch,
              { left: `${mark * 100}%` as unknown as number,
                backgroundColor: progress >= mark ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)" },
            ]}
          />
        ))}
      </View>

      {/* Stats */}
      <View style={[styles.row, { marginTop: 14 }]}>
        <Text style={styles.textSec}>
          <Text style={{ color: C.textPri, fontWeight: "700" }}>{currentTx}</Text>
          {" "}/ {targetTx} transactions
        </Text>
        {remaining > 0 ? (
          <Text style={[styles.textSec, { fontSize: 12 }]}>
            🎯{" "}
            <Text style={{ color: C.amber, fontWeight: "700" }}>{remaining} more</Text>{" "}
            to unlock
          </Text>
        ) : (
          <Text style={[styles.textSec, { fontSize: 12, color: C.green }]}>
            🎉 Milestone unlocked!
          </Text>
        )}
      </View>
    </BlurView>
  );
}

// ─── Quick Scan FAB ───────────────────────────────────────────────────────────
interface QuickScanFABProps {
  onPress: () => void;
}
export function QuickScanFAB({ onPress }: QuickScanFABProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim  = useRef(new Animated.Value(1)).current;

  // Continuous glow pulse
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1.3, duration: 1000, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 1.0, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, [glowAnim]);

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, { toValue: 0.9, friction: 6, useNativeDriver: true }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, { toValue: 1, friction: 4, tension: 120, useNativeDriver: true }).start();
    onPress();
  }, [scaleAnim, onPress]);

  return (
    <View style={styles.fabContainer} pointerEvents="box-none">
      {/* Outer glow ring */}
      <Animated.View
        style={[
          styles.fabGlow,
          { transform: [{ scale: glowAnim }], opacity: 0.35 },
        ]}
      />
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
          <LinearGradient
            colors={["#00D4FF", "#0090CC", "#005A99"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fab}
          >
            <QrCode size={26} color="white" strokeWidth={2.2} />
          </LinearGradient>
        </Pressable>
      </Animated.View>
      <Text style={styles.fabLabel}>Quick Scan</Text>
    </View>
  );
}

// ─── Recent Transactions List Item ───────────────────────────────────────────
interface TxItemProps {
  name: string;
  amount: number;
  time: string;
  status: "synced" | "pending";
}
function TxItem({ name, amount, time, status }: TxItemProps) {
  return (
    <View style={styles.txItem}>
      <View style={[styles.txDot, {
        backgroundColor: status === "synced" ? `${C.green}20` : `${C.amber}20`,
        borderColor: status === "synced" ? `${C.green}40` : `${C.amber}40`,
      }]}>
        <View style={[styles.txDotInner, {
          backgroundColor: status === "synced" ? C.green : C.amber,
        }]} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.txName}>{name}</Text>
        <Text style={styles.txTime}>{time}</Text>
      </View>
      <Text style={styles.txAmount}>₨ {amount.toLocaleString()}</Text>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
const MOCK_TRANSACTIONS: TxItemProps[] = [
  { name: "Lay's Classic 50g × 3",  amount: 450,  time: "2 min ago",   status: "synced"  },
  { name: "Pepsi 1.5L + Kitkat",    amount: 280,  time: "14 min ago",  status: "synced"  },
  { name: "Surf Excel 1kg",         amount: 680,  time: "31 min ago",  status: "pending" },
  { name: "Nescafé Sachets × 6",    amount: 180,  time: "1 hr ago",    status: "synced"  },
];

export default function RetailerDashboard() {
  const { syncStatus, pendingCount, manualSync } = useSyncEngine();

  const handleQuickScan = useCallback(() => {
    // Navigate to barcode scanner screen
    console.log("[FAB] Quick Scan pressed");
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />

      {/* Header */}
      <LinearGradient
        colors={["rgba(15,17,23,0.98)", "rgba(15,17,23,0.85)", "transparent"]}
        style={styles.header}
      >
        <View style={styles.headerInner}>
          <View>
            <Text style={styles.greeting}>Good morning 👋</Text>
            <Text style={styles.headerTitle}>Ahmed's Kiryana</Text>
          </View>
          <View style={styles.headerRight}>
            <SyncStatusBadge status={syncStatus} pending={pendingCount} />
            <TouchableOpacity onPress={manualSync} style={styles.syncBtn}>
              <Zap size={16} color={C.blue} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Scrollable body */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Streak Card */}
        <StreakCard
          storeName="Ahmed's Kiryana Store"
          streakDays={14}
          todayTransactions={23}
        />

        {/* Milestone Tracker */}
        <MilestoneTracker
          currentTx={23}
          targetTx={30}
          milestoneName="FMCG Gift Hamper 🎁"
          milestoneEmoji="🎯"
        />

        {/* Recent Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <BlurView intensity={12} tint="dark" style={styles.glassCard}>
            <LinearGradient
              colors={["rgba(255,255,255,0.04)", "transparent"]}
              style={StyleSheet.absoluteFillObject}
            />
            {MOCK_TRANSACTIONS.map((tx, i) => (
              <React.Fragment key={i}>
                <TxItem {...tx} />
                {i < MOCK_TRANSACTIONS.length - 1 && (
                  <View style={styles.divider} />
                )}
              </React.Fragment>
            ))}
          </BlurView>
        </View>

        {/* Bottom padding for FAB */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <QuickScanFAB onPress={handleQuickScan} />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen:        { flex: 1, backgroundColor: C.bg },
  header:        { paddingTop: Platform.OS === "ios" ? 56 : 32, paddingBottom: 20 },
  headerInner:   { flexDirection: "row", justifyContent: "space-between",
                   alignItems: "center", paddingHorizontal: 20 },
  headerRight:   { flexDirection: "row", alignItems: "center", gap: 10 },
  greeting:      { color: C.textSec, fontSize: 13, fontWeight: "500" },
  headerTitle:   { color: C.textPri, fontSize: 22, fontWeight: "800",
                   letterSpacing: -0.5, marginTop: 2 },
  syncBtn:       { width: 36, height: 36, borderRadius: 10,
                   backgroundColor: `${C.blue}12`,
                   borderWidth: 1, borderColor: `${C.blue}25`,
                   alignItems: "center", justifyContent: "center" },

  scroll:        { flex: 1 },
  scrollContent: { padding: 20 },

  // Glass card base
  glassCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.border,
    overflow: "hidden",
    padding: 20,
    backgroundColor: C.surface,
  },

  // Streak
  streakGlow: {
    position: "absolute", top: -20, right: -20,
    width: 160, height: 160, borderRadius: 80,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1, shadowRadius: 60,
    elevation: 20,
  },
  storeLabel:   { color: C.textPri, fontSize: 16, fontWeight: "700" },
  cardSubtitle: { color: C.textSec, fontSize: 12, fontWeight: "500", marginBottom: 4 },
  streakHeroRow:{ marginTop: 16, marginBottom: 6 },
  streakHero:   { color: C.textPri, fontSize: 26, fontWeight: "900", letterSpacing: -0.5 },
  streakDesc:   { color: C.textSec, fontSize: 13, lineHeight: 19 },
  streakBadge:  { flexDirection: "row", alignItems: "center",
                  backgroundColor: `${C.amber}18`,
                  borderWidth: 1, borderColor: `${C.amber}30`,
                  borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6, gap: 6 },
  streakNumber: { color: C.amber, fontWeight: "800", fontSize: 20 },

  // Progress
  progressTrack: {
    height: 10, borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.06)",
    marginTop: 16, overflow: "hidden", position: "relative",
  },
  progressFill: { height: "100%", borderRadius: 6 },
  notch: {
    position: "absolute", top: 2, width: 1, height: 6, borderRadius: 1,
  },

  // Misc
  row:    { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  chip:   { flexDirection: "row", alignItems: "center",
            borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
  textSec:{ color: C.textSec, fontSize: 13 },

  // Section
  section:      { marginTop: 24 },
  sectionTitle: { color: C.textPri, fontSize: 17, fontWeight: "700",
                  marginBottom: 12, letterSpacing: -0.3 },

  // Transactions
  txItem:      { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12 },
  txDot:       { width: 36, height: 36, borderRadius: 10,
                 borderWidth: 1, alignItems: "center", justifyContent: "center" },
  txDotInner:  { width: 8, height: 8, borderRadius: 4 },
  txName:      { color: C.textPri, fontSize: 14, fontWeight: "600" },
  txTime:      { color: C.textSec, fontSize: 12, marginTop: 2 },
  txAmount:    { color: C.textPri, fontWeight: "700", fontSize: 14 },
  divider:     { height: 1, backgroundColor: "rgba(255,255,255,0.04)", marginHorizontal: -20 },

  // FAB
  fabContainer: {
    position: "absolute", bottom: 32, alignSelf: "center",
    alignItems: "center",
  },
  fabGlow: {
    position: "absolute",
    width: 70, height: 70, borderRadius: 35,
    backgroundColor: C.blue,
    shadowColor: C.blue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1, shadowRadius: 30,
    elevation: 20,
  },
  fab: {
    width: 64, height: 64, borderRadius: 32,
    alignItems: "center", justifyContent: "center",
    shadowColor: C.blue,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7, shadowRadius: 20,
    elevation: 16,
  },
  fabLabel: {
    color: C.blue, fontSize: 11, fontWeight: "700",
    marginTop: 6, letterSpacing: 0.5,
  },

  // Badge
  badge: {
    flexDirection: "row", alignItems: "center", gap: 6,
    paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 10, borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  badgeText: { fontSize: 11, fontWeight: "700" },
});
