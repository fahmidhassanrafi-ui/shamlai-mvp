"use client";
import { Button } from "@/components/ui/button";
export function EmptyState({ title, hint, actionLabel, onAction }:{ title: string; hint?: string; actionLabel?: string; onAction?: ()=>void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed p-10 text-center">
      <h3 className="text-base font-medium">{title}</h3>
      {hint ? <p className="mt-1 text-sm text-neutral-500">{hint}</p> : null}
      {actionLabel ? <Button className="mt-4" variant="primary" onClick={onAction}>{actionLabel}</Button> : null}
    </div>
  );
}
