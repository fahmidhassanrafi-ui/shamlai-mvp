"use client";
import * as React from "react";
import { clsx } from "clsx";
export function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  const { className, ...rest } = props;
  return <label className={clsx("mb-1 block text-sm font-medium", className)} {...rest} />;
}
