"use client";
import * as React from "react";
export function Switch({ checked, onCheckedChange, id }: { checked?: boolean; onCheckedChange?: (c: boolean)=>void; id?: string }) {
  return (
    <button id={id} role="switch" aria-checked={!!checked} onClick={()=>onCheckedChange?.(!checked)}
      className={"inline-flex h-6 w-11 items-center rounded-full border " + (checked ? "bg-emeraldBrand border-emeraldBrand" : "bg-neutral-200 border-neutral-300")}>
      <span className={"inline-block h-5 w-5 rounded-full bg-white transition-transform " + (checked ? "translate-x-5" : "translate-x-1")}/>
    </button>
  );
}
