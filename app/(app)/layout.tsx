"use client";
import "@/app/globals.css";
import type { ReactNode } from "react";
import Link from "next/link";
import type { Route } from "next";          // 👈 add this
import { usePathname } from "next/navigation";
import { QueryProvider } from "@/lib/queryClient";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { ThemeProvider, useTheme } from "@/lib/theme";
import { Input } from "@/components/ui/input";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Toaster } from "@/components/ui/toast";

function LeftNav(){
  const { t } = useI18n();
  const pathname = usePathname();

  const items: Array<{ href: Route; label: string; icon: string }> = [
    { href: "/" as Route, label: t("nav.dashboard"), icon: "🏠" },
    { href: "/inbox" as Route, label: t("nav.inbox"), icon: "📥" },
    { href: "/orders" as Route, label: t("nav.orders"), icon: "🧾" },
    { href: "/storefront" as Route, label: t("nav.storefront"), icon: "🛍️" },
    { href: "/inventory" as Route, label: t("nav.inventory"), icon: "📦" },
    { href: "/marketing" as Route, label: t("nav.marketing"), icon: "📢" },
    { href: "/accounting" as Route, label: t("nav.accounting"), icon: "💹" },
    { href: "/supply" as Route, label: t("nav.supply"), icon: "🤝" },
    { href: "/marketplace" as Route, label: t("nav.marketplace"), icon: "🔌" },
    { href: "/settings" as Route, label: t("nav.settings"), icon: "⚙️" }
  ];

  return (
    <nav aria-label="Primary" className="hidden w-60 flex-col gap-1 border-r bg-white p-3 lg:flex">
      <div className="mb-4 px-2 text-xl font-bold text-indigoBrand">Shamlai</div>
      {items.map((i) => (
        <Link
          key={i.href}
          href={i.href}
          className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-neutral-100 ${pathname === i.href ? "bg-neutral-100" : ""}`}
        >
          <span aria-hidden>{i.icon}</span><span>{i.label}</span>
        </Link>
      ))}
      <Link href={"/auth" as Route} className="mt-auto flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-neutral-100">
        <span>🔐</span><span>{t("nav.auth")}</span>
      </Link>
    </nav>
  );
}
