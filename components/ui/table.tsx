"use client";
import * as React from "react";
export function Table(props: React.HTMLAttributes<HTMLTableElement>) { return <table className="w-full border-collapse text-sm" {...props} />; }
export function THead({ children }: { children: React.ReactNode }) { return <thead className="bg-neutral-100 text-neutral-600">{children}</thead>; }
export function TBody({ children }: { children: React.ReactNode }) { return <tbody className="divide-y">{children}</tbody>; }
export function TR({ children }: { children: React.ReactNode }) { return <tr className="hover:bg-neutral-50">{children}</tr>; }
export function TH({ children }: { children: React.ReactNode }) { return <th className="px-3 py-2 text-left font-medium">{children}</th>; }
export function TD({ children }: { children: React.ReactNode }) { return <td className="px-3 py-2">{children}</td>; }
