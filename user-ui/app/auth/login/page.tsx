"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

        {/* Form */}
        <form className="space-y-4">

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
            />
          </div>

          {/* Remember / Forgot */}
          <div className="flex justify-between text-sm text-[#cfc3b3]">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <span className="hover:text-white cursor-pointer">
              Forgot password?
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#3a2f26] py-2 rounded-lg
                       hover:bg-[#4a3a2f] transition shadow-md"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-[#cfc3b3] mt-6">
          Don’t have an account?{" "}
          <span className="text-white cursor-pointer hover:underline">
            Contact admin
          </span>
        </p>
      </div>
    </div>
  );
}