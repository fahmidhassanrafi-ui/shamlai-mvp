"use client";
import { useI18n } from "@/lib/i18n";
import { Switch } from "@/components/ui/switch";
export function LanguageToggle(){
  const { lang, setLang } = useI18n();
  return (
    <div className="flex items-center gap-2" aria-label="Language toggle">
      <span className="text-xs">EN</span>
      <Switch checked={lang === "bn"} onCheckedChange={(c)=> setLang(c ? "bn" : "en")} id="lang-switch"/>
      <span className="text-xs">BN</span>
    </div>
  );
}
