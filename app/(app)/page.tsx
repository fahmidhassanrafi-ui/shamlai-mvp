"use client";
import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/mocks/services";
import { StatCard } from "@/components/StatCard";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function Dashboard(){
  const { t } = useI18n();
  const { data, isLoading, isError, refetch } = useQuery({ queryKey: ["dashboard"], queryFn: getDashboard });
  if (isLoading) return <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"><div className="h-24 animate-pulse rounded-2xl bg-neutral-200"></div></div>;
  if (isError || !data) return <div className="rounded-2xl border p-6"><p>Error loading dashboard.</p><button className="underline" onClick={()=>refetch()}>Retry</button></div>;
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      <Link href="/accounting"><StatCard title={t("kpi.salesToday")} value={`৳ ${data.salesToday.toLocaleString()}`} /></Link>
      <Link href="/orders"><StatCard title={t("kpi.pendingOrders")} value={data.pendingOrders} /></Link>
      <Link href="/inventory"><StatCard title={t("kpi.inventoryAlerts")} value={data.lowStock} /></Link>
      <Link href="/marketing"><StatCard title={t("kpi.marketing")} value={2} /></Link>
      <Link href="/accounting"><StatCard title={t("kpi.cashflow")} value={"৳ 125,000"} /></Link>
    </div>
  );
}
