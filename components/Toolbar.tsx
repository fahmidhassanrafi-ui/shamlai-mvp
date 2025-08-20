"use client";
import { Input } from "@/components/ui/input";
import { ReactNode } from "react";
export function Toolbar({ children, placeholder }: { children?: ReactNode; placeholder?: string }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <Input placeholder={placeholder || ""} aria-label="search"/>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}
