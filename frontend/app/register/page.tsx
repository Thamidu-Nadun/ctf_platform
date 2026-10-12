"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, Shield } from "lucide-react";
import { register } from "@/services/user.service";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!termsAccepted) {
      setError("Accept the protocol terms to continue.");
      return;
    }

    setBusy(true);
    setError("");
    try {
      await register({ name, email, password });
      router.push("/login");
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Could not create account.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono relative soc-scanline bg-cyber-grid flex items-center justify-center p-6">
      <div className="w-full max-w-md border border-emerald-900/80 bg-slate-950/90 p-8 rounded-xl relative z-10 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
        {/* LOGO & TITLE */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-950/50 border border-emerald-600/40 mb-3">
            <UserPlus className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-black tracking-widest text-white uppercase">
            INITIALIZE AGENT
          </h1>
          <p className="text-xs text-emerald-400 font-bold mt-1 tracking-wider">
            {"// CREATE RAVEN//TRACE IDENT"}
          </p>
        </div>

        {/* REGISTER FORM */}
        {error && (
          <div
            role="alert"
            className="mb-4 rounded border border-red-600/50 bg-red-950/80 p-2.5 text-center text-xs text-red-400"
          >
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleRegister}>
          {/* USERNAME */}
          <div>
            <label className="block text-xs uppercase text-slate-400 mb-1 font-bold">
              Unique Agent Handle
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={256}
                placeholder="cypher_zero"
                className="w-full bg-slate-900/80 border border-slate-800 focus:border-emerald-500 text-white text-sm px-4 py-2 rounded outline-none transition"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-0.5">
              *Will appear publicly on Leaderboards & Solves
            </p>
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-xs uppercase text-slate-400 mb-1 font-bold">
              Encrypted Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={256}
              placeholder="agent@fsociety.org"
              className="w-full bg-slate-900/80 border border-slate-800 focus:border-emerald-500 text-white text-sm px-4 py-2 rounded outline-none transition"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-xs uppercase text-slate-400 mb-1 font-bold">
              Master Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              maxLength={256}
              placeholder="••••••••••••"
              className="w-full bg-slate-900/80 border border-slate-800 focus:border-emerald-500 text-white text-sm px-4 py-2 rounded outline-none transition"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-xs uppercase text-slate-400 mb-1 font-bold">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              maxLength={256}
              placeholder="••••••••••••"
              className="w-full bg-slate-900/80 border border-slate-800 focus:border-emerald-500 text-white text-sm px-4 py-2 rounded outline-none transition"
            />
          </div>

          {/* TERMS */}
          <div className="flex items-start gap-2 text-xs text-slate-400 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="accent-emerald-500 mt-0.5 rounded bg-slate-900"
            />
            <label htmlFor="terms" className="cursor-pointer text-[11px]">
              Accept Protocol Terms & Rules of Engagement
            </label>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={busy}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 rounded text-sm transition flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.3)] mt-2"
          >
            <Shield className="w-4 h-4" />
            {busy ? "CREATING ACCOUNT..." : "CREATE ACCOUNT CLEARANCE"}
          </button>
        </form>

        {/* LOGIN LINK */}
        <div className="mt-5 pt-4 border-t border-slate-900 text-center text-xs text-slate-400">
          Already cleared agent?{" "}
          <Link
            href="/login"
            className="text-red-400 font-bold hover:underline"
          >
            Access Terminal (/login)
          </Link>
        </div>
      </div>
    </div>
  );
}
