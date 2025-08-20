"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "primary" | "destructive" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, className, variant="default", size="md", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const base = "inline-flex items-center justify-center rounded-xl font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none";
    const sizes: Record<string,string> = { sm: "h-8 px-3 text-sm", md: "h-10 px-4 text-sm", lg: "h-12 px-6 text-base" };
    const variants: Record<string,string> = {
      default: "bg-neutral-100 hover:bg-neutral-200 text-neutral-900",
      primary: "bg-coralBrand hover:brightness-110 text-white",
      destructive: "bg-red-600 hover:bg-red-700 text-white",
      outline: "border border-neutral-300 hover:bg-neutral-50"
    };
    return <Comp ref={ref} className={clsx(base, sizes[size], variants[variant], className)} {...props} />;
  }
);
Button.displayName = "Button";
