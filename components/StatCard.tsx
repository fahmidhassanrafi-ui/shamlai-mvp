"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export function StatCard({ title, value, footer }: { title: string; value: string | number; footer?: string }) {
  return (
    <Card className="p-0">
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="text-2xl font-semibold">{value}</CardContent>
      {footer ? <div className="px-4 pb-4 text-xs text-neutral-500">{footer}</div> : null}
    </Card>
  );
}
