import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0F1117" }}>
      <div className="bg-mesh" />
      <Sidebar />
      <main
        style={{
          flex: 1,
          marginLeft: 260,
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
          overflowX: "hidden",
        }}
      >
        {children}
      </main>
    </div>
  );
}
