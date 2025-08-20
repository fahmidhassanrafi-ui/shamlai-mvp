/* eslint-disable no-unused-vars */
"use client";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Table, TBody, THead, TR, TH, TD } from "@/components/ui/table";

export function DataTable<T>({ rows, columns, pageSize = 8 }: {
  rows: T[];
  columns: { key: keyof T; header: string; render?: (_value: any, _row: T) => ReactNode }[];
  pageSize?: number;
}) {
  const [page, setPage] = useState(1);
  const start = (page - 1) * pageSize;
  const data = useMemo(() => rows.slice(start, start + pageSize), [rows, start, pageSize]);
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  return (
    <div className="rounded-2xl border">
      <Table>
        <THead>
          <TR>{columns.map((c) => <TH key={String(c.key)}>{c.header}</TH>)}</TR>
        </THead>
        <TBody>
          {data.map((r, idx) => (
            <TR key={idx}>
              {columns.map((c) => (
                <TD key={String(c.key)}>
                  {c.render ? c.render((r as any)[c.key], r) : String((r as any)[c.key])}
                </TD>
              ))}
            </TR>
          ))}
        </TBody>
      </Table>
      <div className="flex items-center justify-between px-3 py-2 text-sm">
        <span>Page {page} of {totalPages}</span>
        <div className="flex gap-2">
          <button className="rounded-xl border px-2 py-1" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
          <button className="rounded-xl border px-2 py-1" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
}
