"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md bg-[#1c1a17] p-8 rounded-2xl shadow-xl">

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold text-white">
            Welcome Back
          </h1>
          <p className="text-sm text-[#cfc3b3] mt-2">
            Sign in to access your water management dashboard
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-200 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-[#e7dcca]">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#2a241e] border border-[#3a2f26]
                         focus:outline-none focus:ring-2 focus:ring-[#6b4f3a]"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1 text-[#e7dcca]">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#2a241e] border border-[#3a2f26]
                         focus:outline-none focus:ring-2 focus:ring-[#6b4f3a]"
              required
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-[#cfc3b3] hover:text-white hover:underline cursor-pointer">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3a2f26] py-2 rounded-lg
                       hover:bg-[#4a3a2f] transition shadow-md disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-[#cfc3b3] mt-6">
          Don’t have an account?{" "}
          <Link href="/auth/register" className="text-white cursor-pointer hover:underline">
            Regester
          </Link>
        </p>
      </div>
    </div>
  );
}