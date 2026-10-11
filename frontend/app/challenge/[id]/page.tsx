"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink, Play, Server } from "lucide-react";
import NavBar from "@/Components/platform/NavBar";
import { Badge, Field, State, buttonClass, inputClass } from "@/Components/platform/ui";
import { usePresentation, useResource } from "@/lib/hooks";
import { api, dateLabel, safeUrl, single, type Category, type Challenge, type Environment, type Instance } from "@/lib/platform";
export default function ChallengeDetails() {
  const { id } = useParams<{ id: string }>();
  const challenge = useResource<Challenge>(`/challenge/${encodeURIComponent(id)}`);
  const environments = useResource<Environment[]>("/env"); const categories = useResource<Category[]>("/category");
  const { presentation } = usePresentation();
  const [userId,setUserId]=useState(""); const [environmentId,setEnvironmentId]=useState("");
  const [instance,setInstance]=useState<Instance|null>(null); const [busy,setBusy]=useState(false); const [error,setError]=useState("");
  useEffect(()=>{setUserId(localStorage.getItem("userId") || "");setInstance(null);setError("");setEnvironmentId("");},[id]);
  const metadata=presentation.challenges[id]; const c=challenge.data;
  const selectedEnvironment=environmentId || String(c?.environmentId || metadata?.environmentId || "");
  const launch=async()=>{
    setBusy(true);setError("");
    try { const created=single(await api<Instance|Instance[]>("/instance",{method:"POST",body:JSON.stringify({challengeId:Number(id),environmentId:Number(selectedEnvironment),userId:userId.trim(),status:"running"})}));setInstance(created); }
    catch(err){setError(err instanceof Error?err.message:"Could not create the instance.");}finally{setBusy(false);}
  };
  const connection=safeUrl(instance?.connectionUrl);
  return <div className="min-h-screen bg-slate-950"><NavBar /><main className="mx-auto max-w-7xl px-5 py-10"><Link href="/challenge" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400"><ArrowLeft size={16} /> Back to challenges</Link><State loading={challenge.loading} error={challenge.error} retry={challenge.refresh} />
    {c && !challenge.error && <div className="grid items-start gap-8 lg:grid-cols-[1fr_360px]"><div><div className="flex flex-wrap gap-3"><Badge tone={c.level}>{c.level}</Badge><Badge>{c.points} points</Badge><Badge>{categories.data?.find(item=>item.id===c.categoryId)?.name || `Category ${c.categoryId}`}</Badge></div><h1 className="mt-5 break-words text-3xl font-black md:text-4xl">{c.name}</h1><p className="mt-2 text-xs text-slate-500">CHALLENGE #{c.id} / EVENT #{c.eventId}</p>
      <section className="mt-8 rounded-xl border border-slate-800 bg-slate-900/40 p-6"><h2 className="mb-4 font-bold">The investigation</h2><p className="whitespace-pre-wrap text-sm leading-8 text-slate-400">{c.description}</p><div className="mt-5 flex flex-wrap gap-2">{(c.tags || metadata?.tags || []).map(tag=><Badge key={tag}>{tag}</Badge>)}</div></section>
      <section className="mt-6 rounded-xl border border-slate-800 bg-slate-900/40 p-6"><h2 className="mb-2 flex items-center gap-2 font-bold"><Download size={18} className="text-emerald-400" /> Challenge files</h2><p className="mb-5 text-xs text-slate-500">Evidence and resources for this investigation.</p>{(c.files || metadata?.files || []).length ? <div className="space-y-3">{(c.files || metadata?.files || []).map(file=>{const url=safeUrl(file.url);return url?<a key={file.url} href={url} download target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-950 p-4 text-sm hover:border-emerald-500"><span>{file.name}</span><Download size={16} className="text-emerald-400" /></a>:null;})}</div>:<p className="text-sm text-slate-500">No downloadable files are attached to this challenge.</p>}</section>
    </div><aside className="rounded-xl border border-emerald-900/60 bg-slate-900/60 p-6 lg:sticky lg:top-6"><div className="mb-5 flex items-center gap-3"><Server className="text-emerald-400" /><div><h2 className="font-bold">Your target instance</h2><p className="mt-1 text-xs text-slate-500">A dedicated environment for this challenge.</p></div></div>
      {!instance ? <div className="space-y-5"><Field label="User ID"><input required maxLength={50} className={inputClass} value={userId} onChange={e=>setUserId(e.target.value)} placeholder="Your registered user ID" /></Field><Field label="Environment"><select className={inputClass} value={selectedEnvironment} onChange={e=>setEnvironmentId(e.target.value)}><option value="">Choose an environment</option>{environments.data?.map(env=><option key={env.id} value={env.id}>#{env.id} — {env.imageName || env.imageUrl || "Environment"}</option>)}</select></Field><State error={environments.error} retry={environments.refresh} />{environments.loading && <p className="text-xs text-slate-500">Loading environments…</p>}{!environments.loading && environments.data?.length===0 && <p className="text-xs text-amber-300">No environments are configured yet.</p>}<button onClick={launch} disabled={busy || !userId.trim() || !selectedEnvironment} className={`${buttonClass} w-full`}><Play size={16} />{busy?"Creating instance…":"Create instance"}</button><p className="text-xs leading-5 text-slate-500">Use the ID of an existing registered user. <Link href="/login" className="text-emerald-400 hover:underline">Log in</Link> or <Link href="/register" className="text-emerald-400 hover:underline">create an account</Link>.</p></div>:<div className="space-y-4"><Badge tone="ongoing">{instance.status}</Badge><p className="break-all text-xs text-slate-500">Instance {instance.id}</p><p className="text-xs text-slate-400">Expires {dateLabel(instance.expiresAt)} {new Date(instance.expiresAt).toLocaleTimeString()}</p>{connection?<><a href={connection} target="_blank" rel="noopener noreferrer" className={`${buttonClass} w-full`}>Open target <ExternalLink size={16} /></a><p className="break-all rounded-lg bg-slate-950 p-3 text-xs text-emerald-300">{connection}</p></>:<p className="text-sm leading-6 text-amber-300">Instance created. This environment did not expose an HTTP target port.</p>}</div>}<State error={error} />
    </aside></div>}
  </main></div>;
}
