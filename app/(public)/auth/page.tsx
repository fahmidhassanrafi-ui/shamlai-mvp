"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AuthPage(){
  const [mode, setMode] = useState<"signin"|"signup">("signin");
  return (
    <main className="mx-auto grid min-h-screen max-w-md place-items-center p-6">
      <div className="w-full rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-semibold">{mode === "signin" ? "Sign in" : "Create account"}</h1>
        <p className="mb-6 text-sm text-neutral-500">Placeholders only (no real auth).</p>
        <form className="grid gap-4" onSubmit={(e)=> e.preventDefault()}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required placeholder="you@store.com" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" minLength={6} required />
          </div>
          <Button variant="primary" className="w-full" type="submit">{mode === "signin" ? "Sign in" : "Create account"}</Button>
        </form>
        <div className="mt-4 text-center text-sm">
          {mode === "signin" ? (
            <button className="underline" onClick={()=> setMode("signup")}>New here? Create an account</button>
          ) : (
            <button className="underline" onClick={()=> setMode("signin")}>Have an account? Sign in</button>
          )}
        </div>
      </div>
    </main>
  );
}
