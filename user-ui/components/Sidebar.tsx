import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#1c1a17] p-4 rounded-r-3xl">
      <nav className="space-y-2">
        <Link href="/dashboard" className="sidebar-btn">Dashboard</Link>
        <Link href="/usage" className="sidebar-btn">Usage</Link>
        <Link href="/billing" className="sidebar-btn">Billing</Link>
        <Link href="/complaints" className="sidebar-btn">Complaints</Link>
      </nav>
    </aside>
  );
}