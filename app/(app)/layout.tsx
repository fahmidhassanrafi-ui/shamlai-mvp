"use client";
import "@/app/globals.css";
import { ReactNode } from "react";
import Link from "next/link";
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
  const items = [
    { href: "/", label: t("nav.dashboard"), icon: "🏠" },
    { href: "/inbox", label: t("nav.inbox"), icon: "📥" },
    { href: "/orders", label: t("nav.orders"), icon: "🧾" },
    { href: "/storefront", label: t("nav.storefront"), icon: "🛍️" },
    { href: "/inventory", label: t("nav.inventory"), icon: "📦" },
    { href: "/marketing", label: t("nav.marketing"), icon: "📢" },
    { href: "/accounting", label: t("nav.accounting"), icon: "💹" },
    { href: "/supply", label: t("nav.supply"), icon: "🤝" },
    { href: "/marketplace", label: t("nav.marketplace"), icon: "🔌" },
    { href: "/settings", label: t("nav.settings"), icon: "⚙️" }
  ];
  return (
    <nav aria-label="Primary" className="hidden w-60 flex-col gap-1 border-r bg-white p-3 lg:flex">
      <div className="mb-4 px-2 text-xl font-bold text-indigoBrand">Shamlai</div>
      {items.map(i => (
        <Link key={i.href} href={i.href} className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-neutral-100 ${pathname === i.href ? "bg-neutral-100" : ""}`}>
          <span aria-hidden>{i.icon}</span><span>{i.label}</span>
        </Link>
      ))}
      <Link href="/auth" className="mt-auto flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-neutral-100">
        <span>🔐</span><span>{t("nav.auth")}</span>
      </Link>
    </nav>
  );
}

function TopBar(){
  const { t } = useI18n();
  const { theme, setTheme } = useTheme();
  return (
    <header className="flex items-center gap-3 border-b bg-white p-3">
      <div className="flex flex-1 items-center gap-3">
        <Input placeholder={t("search.placeholder")} aria-label={t("search.placeholder")} />
      </div>
      <LanguageToggle />
      <button aria-label="Toggle theme" className="rounded-xl border px-2 py-1" onClick={()=> setTheme(theme === "light" ? "dark" : "light")}>{theme === "light" ? "🌞" : "🌙"}</button>
      <button aria-label="Help" className="rounded-xl border px-2 py-1">❓</button>
      <button aria-label="Profile" className="rounded-xl border px-2 py-1">👤</button>
    </header>
  );
}

export default function AppLayout({ children }: { children: ReactNode }){
  return (
    <ThemeProvider>
      <I18nProvider>
        <QueryProvider>
          <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[240px_1fr]">
            <LeftNav />
            <div className="flex min-w-0 flex-col">
              <TopBar />
              <main className="flex-1 p-4">{children}</main>
            </div>
          </div>
          <Toaster />
        </QueryProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
