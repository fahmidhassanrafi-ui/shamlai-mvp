"use client";
import { useQuery } from "@tanstack/react-query";
import { listSKUs } from "@/mocks/services";
import { DataTable } from "@/components/DataTable";
import Link from "next/link";
import { InlineAlert } from "@/components/InlineAlert";
import { useMemo } from "react";
import { useI18n } from "@/lib/i18n";

export default function InventoryPage(){
  const { t } = useI18n();
  const { data: skus = [] } = useQuery({ queryKey: ["skus"], queryFn: listSKUs });
  const low = skus.filter(s => s.inStock <= s.reorderLevel).length;
  const rows = useMemo(()=> skus.map(s => ({
    code: s.code, product: s.productId, inStock: s.inStock, reserved: s.reserved, reorderLevel: s.reorderLevel
  })), [skus]);
  return (
    <div className="space-y-3">
      {low > 0 && <InlineAlert tone="warning">{t("inventory.lowstock")} — <Link className="underline" href="/supply">{t("inventory.findSuppliers")}</Link></InlineAlert>}
      <DataTable rows={rows} columns={[
        { key: "code", header: "SKU" },
        { key: "product", header: "Product" },
        { key: "inStock", header: "In-Stock" },
        { key: "reserved", header: "Reserved" },
        { key: "reorderLevel", header: "Reorder level" }
      ]} />
    </div>
  );
}
