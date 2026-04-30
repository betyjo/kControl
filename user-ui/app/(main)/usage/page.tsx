import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Droplets } from "lucide-react";

export default function Usage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Card className="border-none shadow-lg">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Droplets className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Usage Analytics</CardTitle>
            <CardDescription>Deep dive into your water consumption patterns</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="rounded-xl border-2 border-dashed p-12 text-center">
             <h3 className="text-lg font-semibold mb-2">Detailed Usage Coming Soon</h3>
             <p className="text-muted-foreground max-w-sm mx-auto">
               We are working on bringing you advanced analytics and historical comparisons.
             </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}