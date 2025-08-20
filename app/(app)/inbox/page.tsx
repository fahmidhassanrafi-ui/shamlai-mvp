"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listMessages, getConversation, createOrderFromMessage, listSKUs } from "@/mocks/services";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/EmptyState";
import { InlineAlert } from "@/components/InlineAlert";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";

export default function InboxPage(){
  const { t } = useI18n();
  const qc = useQueryClient();
  const [filter, setFilter] = useState<"all"|"messenger"|"whatsapp"|"instagram">("all");
  const [selected, setSelected] = useState<string | null>(null);
  const { data: messages = [] } = useQuery({ queryKey: ["messages", filter], queryFn: ()=> listMessages(filter === "all" ? undefined : filter) });
  const { data: convo } = useQuery({ queryKey: ["convo", selected], queryFn: ()=> selected ? getConversation(selected) : null });
  const { data: skus = [] } = useQuery({ queryKey: ["skus"], queryFn: listSKUs });
  const { add } = useToast();

  const mutation = useMutation({
    mutationFn: (payload: { messageId: string; skuId: string; qty: number }) => {
      return createOrderFromMessage(payload.messageId, [{ skuId: payload.skuId, quantity: payload.qty, price: skus.find(s => s.id === payload.skuId)?.price || 0 }]);
    },
    onSuccess: () => {
      add("Order created");
      qc.invalidateQueries({ queryKey: ["orders"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    }
  });

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[320px_1fr]">
      <aside className="rounded-2xl border bg-white">
        <div className="flex gap-1 p-2">
          {([["all", t("inbox.filters.all")], ["messenger", t("inbox.filters.messenger")], ["whatsapp", t("inbox.filters.whatsapp")], ["instagram", t("inbox.filters.instagram")]] as const).map(([k, label]) => (
            <button key={k} className={`flex-1 rounded-xl border px-2 py-1 text-sm ${filter===k ? "bg-neutral-100" : ""}`} onClick={()=> setFilter(k as any)}>{label}</button>
          ))}
        </div>
        <div className="max-h-[70vh] divide-y overflow-auto">
          {messages.length === 0 ? (
            <div className="p-4"><EmptyState title={t("empty.inbox")} /></div>
          ) : messages.map(m => (
            <button key={m.id} className={`block w-full p-3 text-left hover:bg-neutral-50 ${selected===m.id ? "bg-neutral-50" : ""}`} onClick={()=> setSelected(m.id)}>
              <div className="flex items-center justify-between"><span className="text-sm font-medium capitalize">{m.channel}</span><span className="text-xs text-neutral-500">{new Date(m.createdAt).toLocaleString()}</span></div>
              <div className="truncate text-sm">{m.text}</div>
            </button>
          ))}
        </div>
      </aside>
      <section className="rounded-2xl border bg-white p-3">
        {!convo ? <InlineAlert tone="info">Select a message to view conversation.</InlineAlert> : (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_320px]">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{convo.customer.name}</h3>
              <div className="max-h-[60vh] space-y-2 overflow-auto rounded-lg border p-2">
                {convo.convo.map(c => (
                  <div key={c.id} className="rounded-xl border bg-neutral-50 p-2">
                    <div className="text-xs text-neutral-500">{new Date(c.createdAt).toLocaleString()}</div>
                    <div>{c.text}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border p-3">
              <h4 className="mb-2 font-semibold">{t("cta.convertToOrder")}</h4>
              <div className="space-y-2">
                <label className="text-sm">Product / SKU</label>
                <Select aria-label="SKU" options={skus.map(s => ({ value: s.id, label: `${s.code} — ৳${s.price}` }))} onChange={()=>{}} />
                <label className="text-sm">Quantity</label>
                <input type="number" min={1} defaultValue={1} id="qty" className="h-10 w-full rounded-xl border px-3 text-sm"/>
                <Button variant="primary" className="w-full" onClick={()=>{
                  const select = document.querySelector('select[aria-label="SKU"]') as HTMLSelectElement;
                  const qty = Number((document.getElementById("qty") as HTMLInputElement).value || 1);
                  if (!select?.value) return alert("Select a SKU");
                  if (!selected) return;
                  mutation.mutate({ messageId: selected, skuId: select.value, qty });
                }}>{t("cta.convertToOrder")}</Button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
