"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import { toast } from "sonner";
import { Loader2, UserPlus, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    accountNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/register", form);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("Account created successfully! Welcome to Kora Control.");
      router.push("/dashboard");
    } catch (err: unknown) {
      const errorMsg =
        (err as { response?: { data?: { error?: string } } }).response?.data?.error ||
        "Registration failed. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4 py-12">
      <Card className="w-full max-w-md border-none shadow-2xl">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-primary/10 p-3">
              <UserPlus className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Create Account</CardTitle>
          <CardDescription>
            Join Kora Control to start managing your water consumption
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-semibold">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className="h-11 shadow-sm"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-semibold">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                className="h-11 shadow-sm"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountNumber" className="text-base font-semibold">Water Account Number</Label>
              <Input
                id="accountNumber"
                name="accountNumber"
                placeholder="ACC-123456"
                value={form.accountNumber}
                onChange={handleChange}
                className="h-11 shadow-sm"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-semibold">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="h-11 shadow-sm pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold transition-all hover:scale-[1.01] mt-6"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center">
          <div className="text-sm text-muted-foreground font-medium">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-bold text-primary hover:underline"
            >
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
