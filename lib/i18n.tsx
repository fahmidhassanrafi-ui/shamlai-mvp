/* eslint-disable no-unused-vars */
"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "@/locales/en.json";
import bn from "@/locales/bn.json";

type Lang = "en" | "bn";
type Dict = typeof en;

type TFunc = (key: keyof Dict) => string;
type SetLang = (_l: Lang) => void;

const dicts: Record<Lang, Dict> = { en, bn };

const I18nContext = createContext<{ lang: Lang; t: TFunc; setLang: SetLang } | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(
    (typeof window !== "undefined" && (localStorage.getItem("lang") as Lang)) || "en"
  );
  useEffect(() => { localStorage.setItem("lang", lang); }, [lang]);

  const t: TFunc = (k) => dicts[lang][k] ?? String(k);
  const value = useMemo(() => ({ lang, t, setLang }), [lang, t, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
