import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#1c1a17] p-4 rounded-r-3xl">
      <nav className="space-y-2">
        <Link href="/dashboard" className="sidebar-btn cursor-pointer">Dashboard</Link>
        <Link href="/usage" className="sidebar-btn cursor-pointer">Usage</Link>
        <Link href="/billing" className="sidebar-btn cursor-pointer">Billing</Link>
        <Link href="/complaints" className="sidebar-btn cursor-pointer">Complaints</Link>
      </nav>
    </aside>
  );
}