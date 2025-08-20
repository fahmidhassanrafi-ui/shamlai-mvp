"use client";
export function InlineAlert({ tone = "info", children }: { tone?: "info" | "warning" | "success"; children: React.ReactNode }) {
  const map = {
    info: "bg-blue-50 text-blue-800 border-blue-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    success: "bg-emerald-50 text-emerald-800 border-emerald-200"
  } as const;
  return <div className={`rounded-xl border px-3 py-2 text-sm ${map[tone]}`}>{children}</div>;
}
