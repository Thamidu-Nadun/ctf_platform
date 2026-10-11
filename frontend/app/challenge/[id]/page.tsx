"use client";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Flag,
  KeyRound,
  LockKeyhole,
  Play,
  Server,
} from "lucide-react";
import NavBar from "@/Components/platform/NavBar";
import {
  Badge,
  Field,
  State,
  buttonClass,
  inputClass,
} from "@/Components/platform/ui";
import { getChallenge } from "@/services/challenge.service";
import { getCategories } from "@/services/category.service";
import { createInstance } from "@/services/instance.service";
import { getEnvironments } from "@/services/environment.service";
import { getHintsByChallengeId, type Hint } from "@/services/hint.service";
import {
  getFlagByChallengeId,
  type Flag as ChallengeFlag,
} from "@/services/flag.service";
import { createSubmission } from "@/services/submission.service";
import { usePresentation } from "@/lib/hooks";
import {
  dateLabel,
  safeUrl,
  type Category,
  type Challenge,
  type Environment,
  type Instance,
} from "@/lib/platform";
function useServiceResource<T>(load: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);
  const refresh = useCallback(() => {
    setLoading(true);
    setError("");
    setRevision((value) => value + 1);
  }, []);

  useEffect(() => {
    let active = true;
    load()
      .then((value) => {
        if (active) setData(value);
      })
      .catch((reason: Error) => {
        if (active) setError(reason.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [load, revision]);

  return { data, loading, error, refresh };
}

const USER_ID_COOKIE = "userId";

function readCookie(name: string) {
  const value = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.split("=")
    .slice(1)
    .join("=");
  return value ? decodeURIComponent(value) : "";
}

function saveUserIdCookie(userId: string) {
  document.cookie = `${USER_ID_COOKIE}=${encodeURIComponent(userId)}; path=/; max-age=2592000; samesite=lax`;
}

const unlockedHintsKey = (challengeId: string) =>
  `raven.unlocked-hints.${challengeId}`;

export default function ChallengeDetails() {
  const { id } = useParams<{ id: string }>();
  const loadChallenge = useCallback(() => getChallenge(Number(id)), [id]);
  const challenge = useServiceResource<Challenge>(loadChallenge);
  const environments = useServiceResource<Environment[]>(getEnvironments);
  const categories = useServiceResource<Category[]>(getCategories);
  const loadHints = useCallback(() => getHintsByChallengeId(Number(id)), [id]);
  const loadFlag = useCallback(() => getFlagByChallengeId(Number(id)), [id]);
  const hints = useServiceResource<Hint[]>(loadHints);
  const flag = useServiceResource<ChallengeFlag>(loadFlag);
  const { presentation } = usePresentation();
  const [environmentId, setEnvironmentId] = useState("");
  const [instance, setInstance] = useState<Instance | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [unlockedHintIds, setUnlockedHintIds] = useState<number[]>([]);
  const [flagText, setFlagText] = useState("");
  const [flagMessage, setFlagMessage] = useState("");
  const [flagError, setFlagError] = useState("");
  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      const cookieUserId = readCookie(USER_ID_COOKIE);
      const storedUserId = cookieUserId || localStorage.getItem("userId") || "";
      if (storedUserId && !cookieUserId) saveUserIdCookie(storedUserId);
      setInstance(null);
      setError("");
      setEnvironmentId("");
      setFlagText("");
      setFlagMessage("");
      setFlagError("");
      try {
        const stored = JSON.parse(
          localStorage.getItem(unlockedHintsKey(id)) || "[]",
        );
        setUnlockedHintIds(
          Array.isArray(stored)
            ? stored.filter((hintId): hintId is number =>
                Number.isInteger(hintId),
              )
            : [],
        );
      } catch {
        setUnlockedHintIds([]);
      }
    });
    return () => {
      active = false;
    };
  }, [id]);
  const metadata = presentation.challenges[id];
  const c = challenge.data;
  const selectedEnvironment =
    environmentId || String(c?.environmentId || metadata?.environmentId || "");
  const launch = async () => {
    const authenticatedUserId = readCookie(USER_ID_COOKIE);
    if (!authenticatedUserId) {
      window.alert("Please log in before creating an instance.");
      return;
    }

    setBusy(true);
    setError("");
    try {
      const created = await createInstance({
        challengeId: Number(id),
        environmentId: Number(selectedEnvironment),
        userId: authenticatedUserId,
        status: "running",
      });
      setInstance(created.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not create the instance.",
      );
    } finally {
      setBusy(false);
    }
  };
  const unlockHint = (hintId: number) => {
    setUnlockedHintIds((current) => {
      if (current.includes(hintId)) return current;
      const next = [...current, hintId];
      localStorage.setItem(unlockedHintsKey(id), JSON.stringify(next));
      return next;
    });
  };
  const submitFlag = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const authenticatedUserId =
      readCookie(USER_ID_COOKIE) || localStorage.getItem("userId") || "";
    if (!authenticatedUserId) {
      setFlagError("Please log in before submitting a flag.");
      return;
    }
    if (!c || !flag.data) {
      setFlagError("This challenge does not have a configured flag yet.");
      return;
    }
    setBusy(true);
    setFlagError("");
    setFlagMessage("");
    try {
      if (flagText.trim() !== flag.data.flagText) {
        setFlagError("Incorrect flag. Keep investigating.");
        return;
      }
      await createSubmission({
        userId: authenticatedUserId,
        eventId: c.eventId,
        challengeId: c.id,
        points: c.points,
      });
      setFlagMessage(`Correct flag. +${c.points} points recorded.`);
      setFlagText("");
    } catch (err) {
      setFlagError(
        err instanceof Error ? err.message : "Could not submit the flag.",
      );
    } finally {
      setBusy(false);
    }
  };
  const connection = safeUrl(instance?.targetUrl || undefined);
  return (
    <div className="min-h-screen bg-slate-950">
      <NavBar />
      <main className="mx-auto max-w-7xl px-5 py-10">
        <Link
          href="/challenge"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400"
        >
          <ArrowLeft size={16} /> Back to challenges
        </Link>
        <State
          loading={challenge.loading}
          error={challenge.error}
          retry={challenge.refresh}
        />
        {c && !challenge.error && (
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <div className="flex flex-wrap gap-3">
                <Badge tone={c.level}>{c.level}</Badge>
                <Badge>{c.points} points</Badge>
                <Badge>
                  {categories.data?.find((item) => item.id === c.categoryId)
                    ?.name || `Category ${c.categoryId}`}
                </Badge>
              </div>
              <h1 className="mt-5 wrap-break-word text-3xl font-black md:text-4xl">
                {c.name}
              </h1>
              <p className="mt-2 text-xs text-slate-500">
                CHALLENGE #{c.id} / EVENT #{c.eventId}
              </p>
              <section className="mt-8 rounded-xl border border-slate-800 bg-slate-900/40 p-6">
                <h2 className="mb-4 font-bold">The investigation</h2>
                <p className="whitespace-pre-wrap text-sm leading-8 text-slate-400">
                  {c.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(c.tags || metadata?.tags || []).map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </section>
              <section className="mt-6 rounded-xl border border-slate-800 bg-slate-900/40 p-6">
                <h2 className="mb-2 flex items-center gap-2 font-bold">
                  <Download size={18} className="text-emerald-400" /> Challenge
                  files
                </h2>
                <p className="mb-5 text-xs text-slate-500">
                  Evidence and resources for this investigation.
                </p>
                {(c.files || metadata?.files || []).length ? (
                  <div className="space-y-3">
                    {(c.files || metadata?.files || []).map((file) => {
                      const url = safeUrl(file.url);
                      return url ? (
                        <a
                          key={file.url}
                          href={url}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-950 p-4 text-sm hover:border-emerald-500"
                        >
                          <span>{file.name}</span>
                          <Download size={16} className="text-emerald-400" />
                        </a>
                      ) : null;
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">
                    No downloadable files are attached to this challenge.
                  </p>
                )}
              </section>
              <section className="mt-6 rounded-xl border border-amber-900/60 bg-slate-900/40 p-6">
                <h2 className="mb-2 flex items-center gap-2 font-bold">
                  <KeyRound size={18} className="text-amber-300" /> Hints
                </h2>
                <p className="mb-5 text-xs text-slate-500">
                  Unlock clues when you need another lead. Unlocked hints stay
                  available on this device.
                </p>
                <State
                  loading={hints.loading}
                  error={hints.error}
                  retry={hints.refresh}
                />
                {!hints.loading && !hints.error && hints.data?.length === 0 && (
                  <p className="text-sm text-slate-500">
                    No hints are available for this challenge.
                  </p>
                )}
                <div className="space-y-3">
                  {hints.data?.map((hint) => {
                    const unlocked = unlockedHintIds.includes(hint.id);
                    return (
                      <div
                        key={hint.id}
                        className="rounded-lg border border-slate-700 bg-slate-950 p-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <span className="text-xs font-semibold text-slate-400">
                            HINT {hint.id} / {hint.cost} POINTS
                          </span>
                          {!unlocked && (
                            <button
                              type="button"
                              onClick={() => unlockHint(hint.id)}
                              className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 hover:text-amber-200"
                            >
                              <LockKeyhole size={15} /> Unlock hint
                            </button>
                          )}
                        </div>
                        {unlocked ? (
                          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-amber-100">
                            {hint.hintText}
                          </p>
                        ) : (
                          <p className="mt-3 text-sm text-slate-600">
                            Hint locked. Unlock for {hint.cost} points.
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
              <section className="mt-6 rounded-xl border border-emerald-900/60 bg-slate-900/40 p-6">
                <h2 className="mb-2 flex items-center gap-2 font-bold">
                  <Flag size={18} className="text-emerald-400" /> Submit flag
                </h2>
                <p className="mb-5 text-xs text-slate-500">
                  Enter the flag captured during your investigation.
                </p>
                <form
                  onSubmit={submitFlag}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <input
                    aria-label="Flag submission"
                    value={flagText}
                    onChange={(event) => setFlagText(event.target.value)}
                    className={`${inputClass} flex-1`}
                    placeholder="flag{…}"
                    required
                  />
                  <button
                    disabled={busy || flag.loading || !flag.data}
                    className={buttonClass}
                  >
                    {busy ? "Checking…" : "Submit flag"}
                  </button>
                </form>
                <State error={flag.error || flagError} retry={flag.refresh} />
                {flagMessage && (
                  <p role="status" className="mt-4 text-sm text-emerald-300">
                    {flagMessage}
                  </p>
                )}
              </section>
            </div>
            <aside className="rounded-xl border border-emerald-900/60 bg-slate-900/60 p-6 lg:sticky lg:top-6">
              <div className="mb-5 flex items-center gap-3">
                <Server className="text-emerald-400" />
                <div>
                  <h2 className="font-bold">Your target instance</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    A dedicated environment for this challenge.
                  </p>
                </div>
              </div>
              {!instance ? (
                <div className="space-y-5">
                  <Field label="Environment">
                    <select
                      className={inputClass}
                      value={selectedEnvironment}
                      onChange={(e) => setEnvironmentId(e.target.value)}
                    >
                      <option value="">Choose an environment</option>
                      {environments.data?.map((env) => (
                        <option key={env.id} value={env.id}>
                          #{env.id} —{" "}
                          {env.imageName || env.imageUrl || "Environment"}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <State
                    error={environments.error}
                    retry={environments.refresh}
                  />
                  {environments.loading && (
                    <p className="text-xs text-slate-500">
                      Loading environments…
                    </p>
                  )}
                  {!environments.loading && environments.data?.length === 0 && (
                    <p className="text-xs text-amber-300">
                      No environments are configured yet.
                    </p>
                  )}
                  <button
                    onClick={launch}
                    disabled={busy || !selectedEnvironment}
                    className={`${buttonClass} w-full`}
                  >
                    <Play size={16} />
                    {busy ? "Creating instance…" : "Create instance"}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Badge tone="ongoing">{instance.status}</Badge>
                  <p className="break-all text-xs text-slate-500">
                    Instance {instance.id}
                  </p>
                  <p className="text-xs text-slate-400">
                    Expires {dateLabel(instance.expiresAt)}{" "}
                    {new Date(instance.expiresAt).toLocaleTimeString()}
                  </p>
                  {connection ? (
                    <>
                      <a
                        href={connection}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${buttonClass} w-full`}
                      >
                        Open target <ExternalLink size={16} />
                      </a>
                      <p className="break-all rounded-lg bg-slate-950 p-3 text-xs text-emerald-300">
                        {connection}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm leading-6 text-amber-300">
                      Instance created. This environment did not expose an HTTP
                      target port.
                    </p>
                  )}
                </div>
              )}
              <State error={error} />
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
