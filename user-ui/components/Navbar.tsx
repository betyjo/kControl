"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  return (
    <header className="bg-[#1c1a17] text-[#e7dcca] p-4 flex justify-between rounded-b-3xl shadow">
      <h1 className="font-bold">Kora Control</h1>

      <button type="button" onClick={handleLogout} className="btn-primary cursor-pointer">
        Logout
      </button>
    </header>
  );
}