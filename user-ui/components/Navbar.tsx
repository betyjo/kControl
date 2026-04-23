import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-[#1c1a17] text-[#e7dcca] p-4 flex justify-between rounded-b-3xl shadow">
      <h1 className="font-bold">Kora Control</h1>

      <Link href="/auth/login" className="btn-primary">
        Login
      </Link>
    </header>
  );
}