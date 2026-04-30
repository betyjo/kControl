"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { toast } from "sonner";
import {
  User,
  Mail,
  Hash,
  Shield,
  Calendar,
  Loader2,
  LogOut,
  KeyRound,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  accountNumber: string;
  role: string;
  createdAt: string;
};

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Edit profile form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  // Change password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // Logout confirm
  const [confirmLogout, setConfirmLogout] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me");
        setProfile(res.data);
        setName(res.data.name || "");
        setEmail(res.data.email || "");
      } catch {
        toast.error("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const res = await api.put("/auth/me", { name, email });
      setProfile(res.data.user);
      // Update localStorage so sidebar stays in sync
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        localStorage.setItem("user", JSON.stringify({ ...parsed, name, email }));
      }
      toast.success("Profile updated successfully!");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: string } } }).response?.data?.error ||
        "Failed to update profile.";
      toast.error(msg);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    setSavingPassword(true);
    try {
      await api.put("/auth/me", { currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password changed successfully!");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: string } } }).response?.data?.error ||
        "Failed to change password.";
      toast.error(msg);
    } finally {
      setSavingPassword(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("You have been logged out.");
    router.push("/auth/login");
  };

  const initials = profile?.name
    ? profile.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "??";

  const memberSince = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Skeleton className="h-40 rounded-3xl" />
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-72 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">

      {/* Hero / Avatar card */}
      <Card className="border-none shadow-xl overflow-hidden">
        <div className="h-24 bg-primary" />
        <CardContent className="pt-0 px-8 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
            <div className="h-24 w-24 rounded-2xl bg-primary/10 border-4 border-background flex items-center justify-center text-primary font-black text-3xl shadow-lg shrink-0">
              {initials}
            </div>
            <div className="flex-1 sm:mb-1">
              <h1 className="text-2xl font-bold tracking-tight">{profile?.name || "Member"}</h1>
              <p className="text-muted-foreground text-sm">{profile?.email}</p>
            </div>
            <Badge
              variant="outline"
              className="self-start sm:self-auto h-7 px-3 text-xs font-semibold bg-primary/10 text-primary border-primary/20 uppercase tracking-wider"
            >
              {profile?.role}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card className="shadow-md border-primary/5">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" /> Account Information
          </CardTitle>
          <CardDescription>Read-only details tied to your account</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-muted p-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Account Number</p>
              <p className="font-semibold text-sm mt-0.5">{profile?.accountNumber || "—"}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-muted p-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Member Since</p>
              <p className="font-semibold text-sm mt-0.5">{memberSince}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-muted p-2">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">User ID</p>
              <p className="font-mono text-xs font-medium mt-0.5 text-muted-foreground">{profile?.id?.slice(0, 8)}…</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile */}
      <Card className="shadow-md border-primary/5">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <User className="h-5 w-5 text-primary" /> Edit Profile
          </CardTitle>
          <CardDescription>Update your display name and email address</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="profile-name" className="font-semibold">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="profile-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-9 h-11"
                    placeholder="Your full name"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-email" className="font-semibold">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="profile-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 h-11"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button type="submit" className="gap-2 h-10 px-6" disabled={savingProfile}>
                {savingProfile ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card className="shadow-md border-primary/5">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-primary" /> Change Password
          </CardTitle>
          <CardDescription>Keep your account secure with a strong password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="font-semibold">Current Password</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="h-11 pr-10"
                  placeholder="Enter current password"
                  required
                />
                <button type="button" onClick={() => setShowCurrent((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showCurrent ? "Hide" : "Show"}>
                  {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-password" className="font-semibold">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-11 pr-10"
                    placeholder="At least 6 characters"
                    required
                  />
                  <button type="button" onClick={() => setShowNew((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showNew ? "Hide" : "Show"}>
                    {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="font-semibold">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-11 pr-10"
                    placeholder="Repeat new password"
                    required
                  />
                  <button type="button" onClick={() => setShowConfirm((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showConfirm ? "Hide" : "Show"}>
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button type="submit" variant="outline" className="gap-2 h-10 px-6" disabled={savingPassword}>
                {savingPassword ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <KeyRound className="h-4 w-4" />
                )}
                Update Password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Danger Zone / Logout */}
      <Card className="shadow-md border-destructive/20">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-destructive">
            <LogOut className="h-5 w-5" /> Sign Out
          </CardTitle>
          <CardDescription>
            You will be redirected to the login page and your session will end.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />
          {!confirmLogout ? (
            <Button
              variant="destructive"
              className="gap-2 h-10"
              onClick={() => setConfirmLogout(true)}
            >
              <LogOut className="h-4 w-4" /> Sign Out of Kora Control
            </Button>
          ) : (
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-sm text-muted-foreground mr-2">Are you sure?</p>
              <Button variant="destructive" className="gap-2 h-10" onClick={handleLogout}>
                <LogOut className="h-4 w-4" /> Yes, Sign Me Out
              </Button>
              <Button variant="ghost" className="h-10" onClick={() => setConfirmLogout(false)}>
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
