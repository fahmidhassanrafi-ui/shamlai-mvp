"use client";
import { MiniCalendar } from "@/components/MiniCalendar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function MarketingPage(){
  const [text, setText] = useState("");
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
      <div className="rounded-2xl border bg-white p-3">
        <h3 className="mb-2 font-semibold">Content Calendar</h3>
        <MiniCalendar year={new Date().getFullYear()} month={new Date().getMonth()} />
      </div>
      <div className="rounded-2xl border bg-white p-3">
        <h3 className="mb-2 font-semibold">AI Post Generator (stub)</h3>
        <textarea className="h-40 w-full rounded-xl border p-3 text-sm" placeholder="Prompt: Write a post about new arrivals…" value={text} onChange={(e)=> setText(e.target.value)} />
        <div className="mt-2 flex gap-2">
          <Button variant="primary">Generate</Button>
          <Button>Boost Post</Button>
        </div>
      </div>
    </div>
  );
}
