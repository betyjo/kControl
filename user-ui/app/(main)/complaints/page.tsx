"use client";

import { useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { Loader2, MessageSquare, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ComplaintsPage() {
  const [form, setForm] = useState({
    category: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.category || !form.description) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/complaints", form);
      toast.success("Complaint submitted successfully! Our team will review it.");
      setForm({ category: "", description: "" });
    } catch {
      toast.error("Failed to submit. Please ensure you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      <Card className="border-none shadow-lg">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Submit a Complaint</CardTitle>
            <CardDescription>
              Report issues related to water usage, billing, or service disruptions
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-base font-semibold">Complaint Category</Label>
              <Select 
                value={form.category} 
                onValueChange={(value) => setForm({ ...form, category: value })}
              >
                <SelectTrigger id="category" className="h-11">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="billing">Billing Issue</SelectItem>
                  <SelectItem value="leakage">Water Leakage</SelectItem>
                  <SelectItem value="no-water">No Water Supply</SelectItem>
                  <SelectItem value="quality">Water Quality Issue</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-semibold">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your issue in detail..."
                rows={5}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="resize-none"
                required
              />
            </div>

            <div className="bg-muted/40 p-4 rounded-xl flex gap-3 text-sm text-muted-foreground border border-muted">
              <AlertCircle className="h-5 w-5 shrink-0 text-primary" />
              <p>
                Once submitted, your complaint will be assigned a tracking ID and our support agents will contact you within 24-48 hours.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold transition-all hover:scale-[1.01]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Complaint"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}