"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-emerald-400 font-mono flex items-center justify-center">
        Authenticating...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono">
      {/* Top Navbar */}
      <nav className="flex items-center justify-between p-4 border-b border-slate-800 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="text-emerald-400 font-bold text-lg">RAVEN//TRACE</div>
          <span className="text-[10px] text-red-500 border border-red-500/40 bg-red-950/30 px-1.5 py-0.5 rounded">
            SOC CTF PLATFORM v2.6
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/challenges" className="hover:text-emerald-400">
            &gt;_ Challenges
          </Link>
          <Link href="/events" className="hover:text-emerald-400">
            ⚡ Events
          </Link>

          {/* Admin Tab Button */}
          <Link
            href="/admin"
            className="text-red-400 hover:text-red-300 font-bold border border-red-900/60 bg-red-950/40 px-3 py-1 rounded"
          >
            🛡️ Admin
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center text-center mt-20 px-4">
        <span className="text-xs text-red-500 bg-red-950/50 border border-red-800 px-3 py-1 rounded-full mb-4">
          🔥 SYSTEM DEFCON-1 LEVEL ALERT :: INTRUSION DETECTED
        </span>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-3xl">
          BREACH THE MATRIX. <br />
          <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">
            TRACE THE THREAT ACTOR.
          </span>
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl mt-4">
          Step into a live Security Operations Center (SOC) incident workspace.
          Investigate network PCAPs, reverse malware binaries, exploit live web
          targets, and capture flags.
        </p>

        <div className="flex gap-4 mt-8">
          <Link
            href="/challenges"
            className="bg-emerald-500 text-slate-950 font-bold px-6 py-3 rounded hover:bg-emerald-400 transition"
          >
            BROWSE CHALLENGES &rarr;
          </Link>
          <Link
            href="/events"
            className="border border-slate-700 bg-slate-900/60 px-6 py-3 rounded hover:bg-slate-800 transition"
          >
            VIEW ACTIVE EVENTS
          </Link>
        </div>
      </div>
    </div>
  );
}
