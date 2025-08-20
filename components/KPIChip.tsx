"use client";
export function KPIChip({ label, value }: { label: string; value: string | number }) {
  return <div className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs">{label}<b>{value}</b></div>;
}
