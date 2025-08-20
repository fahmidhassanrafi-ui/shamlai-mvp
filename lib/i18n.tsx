"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "@/locales/en.json";
import bn from "@/locales/bn.json";

type Lang = "en" | "bn";
type Dict = typeof en;

const dicts: Record<Lang, Dict> = { en, bn };
const I18nContext = createContext<{ lang: Lang; t: (k: keyof Dict) => string; setLang: (l: Lang) => void } | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>((typeof window !== "undefined" && (localStorage.getItem("lang") as Lang)) || "en");
  useEffect(() => { localStorage.setItem("lang", lang); }, [lang]);
  const t = (k: keyof Dict) => dicts[lang][k] ?? String(k);
  const value = useMemo(() => ({ lang, t, setLang }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
