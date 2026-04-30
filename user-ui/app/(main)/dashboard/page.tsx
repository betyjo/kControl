"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { 
  Droplets, 
  TrendingUp, 
  AlertCircle, 
  CreditCard, 
  History,
  ArrowUpRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

type DashboardUser = {
  name?: string;
  accountNumber?: string;
};

type UsageEntry = {
  id: number | string;
  timestamp: string;
  consumption: number;
};

export default function Dashboard() {
  const [user, setUser] = useState<DashboardUser | null>(null);
  const [usage, setUsage] = useState<UsageEntry[]>([]);
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

  // Format data for chart
  const chartData = usage.slice(0, 7).reverse().map(u => ({
    name: new Date(u.timestamp).toLocaleDateString(undefined, { weekday: 'short' }),
    value: u.consumption
  }));

  if (loading) {
     return (
       <div className="space-y-6">
         <Skeleton className="h-[140px] w-full rounded-3xl" />
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton className="h-[400px] lg:col-span-2 rounded-2xl" />
            <div className="space-y-6">
                <Skeleton className="h-[180px] rounded-2xl" />
                <Skeleton className="h-[200px] rounded-2xl" />
            </div>
         </div>
       </div>
     )
  }

  const totalThisMonth = usage.reduce((acc, curr) => acc + curr.consumption, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Hero Welcome */}
      <div className="relative overflow-hidden bg-primary p-8 rounded-3xl shadow-xl border-none">
        <div className="relative z-10">
            <h1 className="text-3xl font-bold text-primary-foreground tracking-tight">
              Welcome, <span className="font-extrabold">{user?.name || "Member"}</span>!
            </h1>
            <p className="text-primary-foreground/80 mt-1 max-w-md">
              Your water usage is optimized today. Keep up the sustainable flow!
            </p>
            <div className="flex items-center gap-4 mt-6">
              <Badge variant="secondary" className="px-3 py-1 bg-white/20 text-white border-none hover:bg-white/30">
                Account: {user?.accountNumber || "N/A"}
              </Badge>
              <Badge variant="outline" className="px-3 py-1 bg-green-500/20 text-green-100 border-green-400/30">
                <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                System Active
              </Badge>
            </div>
        </div>
        <Droplets className="absolute -right-10 -bottom-10 h-64 w-64 text-white/10 rotate-12" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Card */}
        <Card className="lg:col-span-2 border-primary/5 shadow-lg overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 bg-muted/30">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold">Consumption Trends</CardTitle>
              <CardDescription>Visualizing your daily water usage (Liters)</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1 shadow-sm h-8">
                <History className="h-3.5 w-3.5" /> History
            </Button>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px] w-full">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 12, fill: 'var(--muted-foreground)'}}
                        dy={10}
                    />
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 12, fill: 'var(--muted-foreground)'}}
                        dx={-10}
                    />
                    <Tooltip 
                        contentStyle={{ 
                            borderRadius: '12px', 
                            border: 'none', 
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                            background: 'var(--card)',
                            color: 'var(--foreground)'
                        }} 
                    />
                    <Area 
                        type="monotone" 
                        dataKey="value" 
                        name="Liters"
                        stroke="var(--primary)" 
                        strokeWidth={4}
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground italic">
                    No consumption data available yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action column */}
        <div className="space-y-6">
          <Card className="bg-primary text-primary-foreground border-none shadow-xl overflow-hidden relative group">
            <CardHeader className="relative z-10">
              <CardDescription className="text-primary-foreground/70 font-semibold uppercase tracking-wider text-xs">Total Consumption</CardDescription>
              <CardTitle className="text-4xl font-black">{totalThisMonth.toFixed(2)} L</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 pb-8">
                <div className="flex items-center gap-1 text-primary-foreground/90 text-sm font-medium">
                    <TrendingUp className="h-4 w-4" /> 
                    <span>12.5% from last month</span>
                </div>
            </CardContent>
            <ArrowUpRight className="absolute right-4 top-4 h-10 w-10 opacity-10 group-hover:opacity-40 group-hover:scale-110 transition-all" />
          </Card>

          <Card className="border-primary/5 shadow-lg">
            <CardHeader className="pb-3 px-6 pt-6">
              <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
              <CardDescription>Shortcut to common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 px-6 pb-6 pt-0">
              <Button asChild className="w-full h-12 shadow-sm gap-2" variant="secondary">
                <a href="/billing">
                  <CreditCard className="h-4 w-4" /> Pay Outstanding Bill
                </a>
              </Button>
              <Button asChild className="w-full h-12 shadow-sm gap-2" variant="outline">
                <a href="/complaints">
                  <AlertCircle className="h-4 w-4" /> Report a Leakage
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Table Card */}
        <Card className="lg:col-span-3 border-primary/5 shadow-lg overflow-hidden">
          <CardHeader className="bg-muted/30">
            <CardTitle className="text-xl font-bold">Detailed Consumption Log</CardTitle>
            <CardDescription>Review your most recent automated meter readings</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/10">
                <TableRow className="hover:bg-transparent border-muted">
                  <TableHead className="font-bold px-6 py-4">Date & Time</TableHead>
                  <TableHead className="font-bold">Reading (Liters)</TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                  <TableHead className="font-bold text-right px-6">Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usage.length > 0 ? (
                  usage.map((u) => (
                    <TableRow key={u.id} className="group transition-colors border-muted hover:bg-muted/5">
                      <TableCell className="px-6 py-4">
                        <div className="flex flex-col">
                            <span className="font-semibold">{new Date(u.timestamp).toLocaleDateString()}</span>
                            <span className="text-xs text-muted-foreground">{new Date(u.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-baseline gap-1">
                            <span className="font-bold text-xl">{u.consumption}</span>
                            <span className="text-xs font-medium text-muted-foreground uppercase">Liters</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">
                          Verified
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs text-muted-foreground px-6 py-4">
                        #ID-{u.id.toString().slice(-6).toUpperCase()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-32 text-center text-muted-foreground italic">
                      No consumption logs found in your account.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}