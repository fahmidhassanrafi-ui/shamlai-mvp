"use client";
import { clsx } from "clsx";
import type { HTMLAttributes, HTMLHeadingElement } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("card p-4", className)} {...props} />;
}
export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("mb-3", className)} {...props} />;
}
export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={clsx("text-lg font-semibold", className)} {...props} />;
}
export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("text-sm", className)} {...props} />;
}
