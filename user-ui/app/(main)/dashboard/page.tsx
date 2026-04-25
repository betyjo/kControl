"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [usage, setUsage] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          setUser(JSON.parse(userStr));
        } catch (e) {
          console.error("Parse user failed", e);
        }
      }

      try {
        const usageRes = await api.get("/usage");
        setUsage(usageRes.data);
      } catch (err) {
        console.error("Fetch usage failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-10 text-white text-center">Loading Dashboard Data...</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Hero Welcome */}
      <div className="bg-gradient-to-br from-[#1c1a17] to-[#2a241e] p-8 rounded-3xl shadow-2xl border border-[#3a2f26]">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Welcome, <span className="text-[#6b4f3a]">{user?.name || "Member"}</span>!
        </h1>
        <div className="flex items-center gap-4 mt-4">
          <div className="px-3 py-1 bg-[#3a2f26] rounded-full text-xs text-[#cfc3b3]">
            Account: {user?.accountNumber || "N/A"}
          </div>
          <div className="px-3 py-1 bg-green-500/10 rounded-full text-xs text-green-400 border border-green-500/20">
            ● System Active
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Usage Stats */}
        <div className="lg:col-span-2 bg-[#1c1a17] p-6 rounded-2xl border border-[#3a2f26] shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Recent Consumption</h2>
            <button className="text-sm text-[#6b4f3a] hover:underline cursor-pointer">View History</button>
          </div>
          
          <div className="space-y-3">
            {usage.length > 0 ? (
              usage.map((u: any) => (
                <div key={u.id} className="flex justify-between items-center p-4 bg-[#2a241e] rounded-xl border border-transparent hover:border-[#3a2f26] transition">
                  <div className="flex flex-col">
                    <span className="text-[#e7dcca] font-medium">{new Date(u.timestamp).toLocaleDateString()}</span>
                    <span className="text-[#cfc3b3] text-xs">{new Date(u.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-white">{u.consumption}</span>
                    <span className="ml-1 text-xs text-[#cfc3b3]">Liters</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-[#cfc3b3] bg-[#2a241e] rounded-xl border border-dashed border-[#3a2f26]">
                No data received yet.
              </div>
            )}
          </div>
        </div>

        {/* Quick Insights */}
        <div className="space-y-6">
          <div className="bg-[#3a2f26] p-6 rounded-2xl shadow-lg text-white">
            <h3 className="font-bold opacity-80 mb-2 text-sm uppercase tracking-wider">Total This Month</h3>
            <div className="text-4xl font-black">0.00 L</div>
          </div>
          
          <div className="bg-[#1c1a17] p-6 rounded-2xl border border-[#3a2f26] shadow-lg">
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="/billing" className="block w-full p-3 bg-[#2a241e] rounded-lg text-[#e7dcca] text-sm hover:bg-[#3a2f26] transition text-center cursor-pointer">
                Pay Bill
              </a>
              <a href="/complaints" className="block w-full p-3 bg-[#2a241e] rounded-lg text-[#e7dcca] text-sm hover:bg-[#3a2f26] transition text-center cursor-pointer">
                Report Issue
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}