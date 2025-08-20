"use client";
import { Button } from "@/components/ui/button";

export default function AccountingPage(){
  const rows = Array.from({ length: 8 }).map((_,i)=> ({ date: new Date().toLocaleDateString(), type: i%2 ? "expense" : "revenue", amount: (i%2 ? -1 : 1) * (1000 + i*321), note: "Mock"}));
  const total = rows.reduce((s,r)=> s + r.amount, 0);
  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Daily P&L</h3>
        <Button onClick={()=> alert("Exported!")}>Export</Button>
      </div>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-neutral-100">
            <tr><th className="px-2 py-1 text-left">Date</th><th className="px-2 py-1 text-left">Type</th><th className="px-2 py-1 text-left">Amount</th><th className="px-2 py-1 text-left">Note</th></tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((r,i)=>(<tr key={i}><td className="px-2 py-1">{r.date}</td><td className="px-2 py-1">{r.type}</td><td className="px-2 py-1">{r.amount}</td><td className="px-2 py-1">{r.note}</td></tr>))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 text-right font-semibold">Total: {total}</div>
    </div>
  );
}
