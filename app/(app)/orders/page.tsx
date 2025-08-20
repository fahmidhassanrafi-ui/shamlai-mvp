"use client";
import { useQuery } from "@tanstack/react-query";
import { listOrders, listSKUs } from "@/mocks/services";
import { DataTable } from "@/components/DataTable";
import { useMemo } from "react";
import { useI18n } from "@/lib/i18n";

export default function OrdersPage(){
  const { t } = useI18n();
  const { data: orders = [] } = useQuery({ queryKey: ["orders"], queryFn: listOrders });
  const { data: skus = [] } = useQuery({ queryKey: ["skus"], queryFn: listSKUs });
  const rows = useMemo(()=> orders.map(o => ({
    id: o.id,
    createdAt: new Date(o.createdAt).toLocaleString(),
    items: o.items.map(i => `${skus.find(s=>s.id===i.skuId)?.code || ""} × ${i.quantity}`).join(", "),
    status: o.status
  })), [orders, skus]);
  return (
    <div>
      <h1 className="mb-3 text-xl font-semibold">{t("orders.title")}</h1>
      {rows.length === 0 ? <div className="rounded-2xl border bg-white p-6 text-sm">{t("orders.empty")}</div> :
        <DataTable rows={rows} columns={[
          { key: "id", header: "ID" },
          { key: "createdAt", header: "Created" },
          { key: "items", header: "Items" },
          { key: "status", header: "Status" }
        ]} />
      }
    </div>
  );
}
