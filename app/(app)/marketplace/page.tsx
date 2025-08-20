"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listIntegrations, setIntegrationInstalled } from "@/mocks/services";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function MarketplacePage(){
  const qc = useQueryClient();
  const { data: integrations = [] } = useQuery({ queryKey: ["integrations"], queryFn: listIntegrations });
  const mut = useMutation({ mutationFn: (p:{ id:string; installed:boolean }) => setIntegrationInstalled(p.id, p.installed), onSuccess: ()=> qc.invalidateQueries({ queryKey: ["integrations"] }) });
  const [config, setConfig] = useState<{ id: string; schema: any } | null>(null);
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {integrations.map(int => (
        <div key={int.id} className="card p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-lg font-semibold">{int.icon} {int.name}</div>
              <div className="text-sm text-neutral-500">{int.description}</div>
            </div>
            <Switch checked={int.isInstalled} onCheckedChange={(c)=> mut.mutate({ id: int.id, installed: c })}/>
          </div>
          <div className="mt-3">
            <Button variant="outline" onClick={()=> setConfig({ id: int.id, schema: int.configSchema })}>Configure</Button>
          </div>
        </div>
      ))}
      {config && <ConfigDialog id={config.id} schema={config.schema} onClose={()=> setConfig(null)}/>}
    </div>
  );
}

function ConfigDialog({ id, schema, onClose }: { id: string; schema: Record<string, any>; onClose: ()=>void }){
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-4">
        <div className="mb-2 text-lg font-semibold">Configure {id}</div>
        <form className="space-y-2" onSubmit={(e)=> { e.preventDefault(); alert("Saved"); onClose(); }}>
          {Object.entries(schema).map(([key, field]) => (
            <div key={key}>
              <label className="text-sm">{field.label}</label>
              {field.type === "select" ? (
                <select className="h-10 w-full rounded-xl border px-3 text-sm">{(field.options||[]).map((o:string)=> <option key={o}>{o}</option>)}</select>
              ) : (
                <input className="h-10 w-full rounded-xl border px-3 text-sm" type={field.type === "secret" ? "password" : "text"} />
              )}
            </div>
          ))}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
