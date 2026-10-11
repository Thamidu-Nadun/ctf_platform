import Link from "next/link";
import { ArrowRight, Network, ShieldCheck, Terminal } from "lucide-react";
import NavBar from "@/Components/platform/NavBar";
export default function Home() {
  return <div className="min-h-screen bg-slate-950 text-slate-100"><NavBar />
    <main className="mx-auto max-w-7xl px-5 py-20 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div><p className="mb-6 text-xs font-semibold tracking-[.2em] text-emerald-400">HANDS-ON SECURITY. REAL INVESTIGATIONS.</p>
          <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">Breach the matrix.<br /><span className="text-emerald-400">Trace the threat.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-400">Step into the SOC workspace. Follow the evidence, investigate network traffic, and sharpen your skills with hands-on cybersecurity challenges.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/challenge" className="flex items-center gap-3 rounded-lg bg-emerald-400 px-6 py-3 font-bold text-slate-950 hover:bg-emerald-300">Explore challenges <ArrowRight size={18} /></Link><Link href="/events" className="rounded-lg border border-slate-700 px-6 py-3 hover:border-emerald-500">Browse events</Link></div>
          <p className="mt-5 text-xs text-slate-500">Explore first. Log in when you are ready.</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/60 shadow-[0_0_80px_#10b98110]"><div className="flex gap-2 border-b border-slate-800 px-5 py-4"><span className="h-2 w-2 rounded-full bg-red-400" /><span className="h-2 w-2 rounded-full bg-amber-400" /><span className="h-2 w-2 rounded-full bg-emerald-400" /><span className="ml-auto text-[10px] tracking-widest text-slate-500">INVESTIGATION WORKSPACE</span></div>
          <div className="space-y-6 p-8 text-sm"><div className="flex items-center gap-3 text-emerald-400"><Terminal size={22} /><span>agent@raven:~$ begin_investigation</span></div><div className="border-l border-slate-700 pl-5 leading-8 text-slate-400">01 / Discover the target<br />02 / Launch your environment<br />03 / Follow the evidence<br /><span className="text-emerald-300">04 / Capture the flag</span></div><div className="rounded-lg border border-emerald-900 bg-emerald-950/30 p-4 text-xs text-emerald-300">Your next investigation starts here. <span className="animate-pulse">▍</span></div></div>
        </div>
      </div>
      <div className="mt-20 grid gap-4 md:grid-cols-3">{[{Icon:Network,title:"Follow the packets",text:"Investigate network evidence and uncover hidden signals."},{Icon:Terminal,title:"Explore live targets",text:"Practice in dedicated challenge environments."},{Icon:ShieldCheck,title:"Build your instincts",text:"Solve challenges across security disciplines."}].map(({Icon,title,text})=><div key={title} className="rounded-xl border border-slate-800 bg-slate-900/30 p-6"><Icon className="mb-4 text-emerald-400" size={24} /><h2 className="font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></div>)}</div>
    </main></div>;
}
