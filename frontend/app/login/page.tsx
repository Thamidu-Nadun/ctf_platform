"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill all fields!");
      return;
    }

    // Login success simulation
    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("username", username);

    // Redirect to Home Page
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-mono">
      <div className="max-w-md w-full border border-slate-800 bg-slate-900/80 rounded-xl p-6 shadow-2xl backdrop-blur-md">
        <div className="text-center mb-6">
          <span className="text-emerald-400 text-xs uppercase tracking-widest">
            {"// SYSTEM AUTHENTICATION"}
          </span>
          <h1 className="text-2xl font-bold text-emerald-400 mt-1">
            RAVEN//TRACE ACCESS
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Enter credentials to access the SOC workspace.
          </p>
        </div>

        {error && (
          <div className="mb-4 text-xs bg-red-950/80 border border-red-600/50 text-red-400 p-2.5 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">
              USERNAME / HANDLE
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              placeholder="e.g., agent_raven"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500 text-emerald-400 font-bold rounded text-sm transition"
          >
            ENTER WORKSPACE
          </button>
        </form>
        <div className="mt-6 border-t border-slate-800 pt-5 text-center text-sm">
          <Link href="/register" className="text-emerald-400 hover:underline">Don&apos;t have an account?</Link>
        </div>
        <div className="mt-3 text-center text-xs"><Link href="/" className="text-slate-500 hover:text-slate-300">Back to home</Link></div>
      </div>
    </div>
  );
}
