"use client";
import * as React from "react";
import { clsx } from "clsx";
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return <input ref={ref} className={clsx("h-10 w-full rounded-xl border border-neutral-300 bg-white px-3 text-sm focus-visible:ring-indigoBrand", className)} {...props} />;
});
Input.displayName = "Input";
