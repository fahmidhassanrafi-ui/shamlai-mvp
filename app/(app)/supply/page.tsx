"use client";
import { Toolbar } from "@/components/Toolbar";

export default function SupplyPage(){
  return (
    <div>
      <Toolbar placeholder="Search suppliers…">
        <button className="rounded-xl border px-3 py-2 text-sm">Filter</button>
      </Toolbar>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {["Fabric House", "Print & DTF Pro", "Package BD", "BoxHub", "TagCo"].map((name,i)=> (
          <div key={i} className="card p-4">
            <div className="text-lg font-semibold">{name}</div>
            <div className="text-sm text-neutral-500">Trusted supplier</div>
            <button className="mt-3 rounded-xl border px-3 py-2 text-sm">View</button>
          </div>
        ))}
      </div>
    </div>
  );
}
