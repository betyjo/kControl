"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    accountNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/register", form);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] py-10">
      <div className="w-full max-w-md bg-[#1c1a17] p-8 rounded-2xl shadow-xl">
        <h1 className="text-xl font-bold text-white mb-6 text-center">Create Account</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-200 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg bg-[#2a241e] border border-[#3a2f26] text-white"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg bg-[#2a241e] border border-[#3a2f26] text-white"
            required
          />
          <input
            name="accountNumber"
            placeholder="Water Account Number"
            value={form.accountNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg bg-[#2a241e] border border-[#3a2f26] text-white"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg bg-[#2a241e] border border-[#3a2f26] text-white"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3a2f26] py-2 rounded-lg text-white font-bold hover:bg-[#4a3a2f] transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-[#cfc3b3]">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-white hover:underline cursor-pointer">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
