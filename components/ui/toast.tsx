/* eslint-disable no-unused-vars */
"use client";
import { create } from "zustand";
import { useEffect } from "react";

type Toast = { id: number; message: string };

const useToastStore = create<{
  toasts: Toast[];
  add: (_message: string) => void;
  remove: (_id: number) => void;
}>((set) => ({
  toasts: [],
  add: (message) => set((s) => ({ toasts: [...s.toasts, { id: Date.now(), message }] })),
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
}));

export function useToast() {
  return useToastStore((s) => ({ add: s.add }));
}

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const remove = useToastStore((s) => s.remove);
  useEffect(() => {
    const timers = toasts.map((t) => setTimeout(() => remove(t.id), 2500));
    return () => { timers.forEach(clearTimeout); };
  }, [toasts, remove]);
  return (
    <div aria-live="polite" className="fixed bottom-4 right-4 flex flex-col gap-2">
      {toasts.map((t) => (
        <div key={t.id} className="rounded-xl bg-neutral-900 text-white px-4 py-2 shadow-lg">
          {t.message}
        </div>
      ))}
    </div>
  );
}
