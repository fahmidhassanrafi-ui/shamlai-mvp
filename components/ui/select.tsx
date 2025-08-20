/* eslint-disable no-unused-vars */
"use client";
import type * as React from "react";

interface Option { value: string; label: string; }
export function Select({
  options,
  value,
  onChange,
  className,
  "aria-label": ariaLabel
}: {
  options: Option[];
  value?: string;
  onChange?: (_v: string) => void;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <select
      aria-label={ariaLabel}
      className={"h-10 rounded-xl border border-neutral-300 bg-white px-3 text-sm " + (className || "")}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}
