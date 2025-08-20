"use client";
import { Button } from "@/components/ui/button";
export default function SettingsPage(){
  return (
    <div className="grid max-w-3xl gap-4">
      <section className="card p-4">
        <h3 className="mb-2 font-semibold">Workspace</h3>
        <input className="h-10 w-full rounded-xl border px-3 text-sm" defaultValue="Shamlai HQ" />
      </section>
      <section className="card p-4">
        <h3 className="mb-2 font-semibold">Billing</h3>
        <p className="text-sm text-neutral-500">Coming soon.</p>
      </section>
      <section className="card p-4">
        <h3 className="mb-2 font-semibold">Team</h3>
        <ul className="list-inside list-disc text-sm">
          <li>you@store.com (Owner)</li>
          <li>ops@store.com</li>
        </ul>
        <Button className="mt-2">Invite</Button>
      </section>
    </div>
  );
}
