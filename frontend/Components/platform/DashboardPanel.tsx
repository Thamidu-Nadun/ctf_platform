"use client";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus, X } from "lucide-react";
import EventCard from "./EventCard";
import { Badge, Field, State, buttonClass, inputClass } from "./ui";
import { usePresentation } from "@/lib/hooks";
import { getCategories } from "@/services/category.service";
import { createChallenge, getChallenges } from "@/services/challenge.service";
import { createEvent, getEvents } from "@/services/event.service";
import { getEnvironments } from "@/services/environment.service";
import { getSubmissions } from "@/services/submission.service";
import { getUsers } from "@/services/user.service";
import {
  dateLabel,
  safeUrl,
  single,
  type Category,
  type Challenge,
  type Environment,
  type Event as CtfEvent,
  type Submission,
  type User,
} from "@/lib/platform";
export type DashboardTab = "events" | "challenges" | "submissions" | "users";
const headings = {
  events: ["Events", "Schedule operations and bring your community together."],
  challenges: [
    "Challenges",
    "Create targets and curate your challenge registry.",
  ],
  submissions: [
    "Submissions",
    "Review recorded submissions and awarded points.",
  ],
  users: ["Users", "Registered agents in your workspace."],
};
function useServiceResource<T>(load: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);
  const refresh = useCallback(() => setRevision((value) => value + 1), []);

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
export default function DashboardPanel({ tab }: { tab: DashboardTab }) {
  const events = useServiceResource<CtfEvent[]>(getEvents);
  const challenges = useServiceResource<Challenge[]>(getChallenges);
  const submissions = useServiceResource<Submission[]>(getSubmissions);
  const users = useServiceResource<User[]>(getUsers);
  const categories = useServiceResource<Category[]>(getCategories);
  const environments = useServiceResource<Environment[]>(getEnvironments);
  const { presentation, save } = usePresentation();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");
  const [image, setImage] = useState("");
  const resource =
    tab === "events"
      ? events
      : tab === "challenges"
        ? challenges
        : tab === "submissions"
          ? submissions
          : users;
  const create = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setBusy(true);
    setFormError("");
    setSuccess("");
    try {
      if (tab === "events") {
        const start = new Date(String(data.get("startDate")));
        const end = new Date(String(data.get("endDate")));
        if (
          Number.isNaN(start.getTime()) ||
          Number.isNaN(end.getTime()) ||
          end <= start
        )
          throw new Error("End date must be after the start date.");
        const imageUrl = String(data.get("imageUrl") || "").trim();
        if (imageUrl && !safeUrl(imageUrl))
          throw new Error("Use a valid HTTP(S) image URL.");
        const created = single(
          await createEvent({
            name: String(data.get("name")).trim(),
            story: String(data.get("story")).trim(),
            status: data.get("status") as CtfEvent["status"],
            startDate: start.toISOString(),
            endDate: end.toISOString(),
          }),
        );
        if (imageUrl)
          save({
            ...presentation,
            eventImages: {
              ...presentation.eventImages,
              [created.id]: imageUrl,
            },
          });
        events.refresh();
        setSuccess("Event created successfully.");
      } else {
        const fileUrl = String(data.get("fileUrl") || "").trim();
        if (fileUrl && !safeUrl(fileUrl))
          throw new Error("Use a valid HTTP(S) file URL or a local path.");
        const created = single(
          await createChallenge({
            name: String(data.get("name")).trim(),
            description: String(data.get("description")).trim(),
            level: data.get("level") as Challenge["level"],
            points: Number(data.get("points")),
            visibility: data.get("visibility") === "on",
            eventId: Number(data.get("eventId")),
            categoryId: Number(data.get("categoryId")),
          }),
        );
        const tags = String(data.get("tags") || "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
        const environmentId = Number(data.get("environmentId"));
        save({
          ...presentation,
          challenges: {
            ...presentation.challenges,
            [created.id]: {
              tags,
              files: fileUrl
                ? [
                    {
                      name: String(data.get("fileName") || "Challenge file"),
                      url: fileUrl,
                    },
                  ]
                : [],
              ...(environmentId ? { environmentId } : {}),
            },
          },
        });
        challenges.refresh();
        setSuccess("Challenge created successfully.");
      }
      form.reset();
      setOpen(false);
      setImage("");
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Could not save the record.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <section className="mx-auto max-w-7xl p-5 md:p-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-[10px] font-semibold tracking-[.2em] text-emerald-400">
            CONTROL CENTER / {tab.toUpperCase()}
          </p>
          <h1 className="mt-3 text-3xl font-black">{headings[tab][0]}</h1>
          <p className="mt-2 text-sm text-slate-500">{headings[tab][1]}</p>
        </div>
        {(tab === "events" || tab === "challenges") && (
          <button
            className={buttonClass}
            onClick={() => {
              setOpen(true);
              setFormError("");
            }}
          >
            <Plus size={17} />
            Create {tab === "events" ? "event" : "challenge"}
          </button>
        )}
      </div>
      <div className="mb-8 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {[
          { name: "Events", value: events.data?.length },
          { name: "Challenges", value: challenges.data?.length },
          { name: "Submissions", value: submissions.data?.length },
          { name: "Users", value: users.data?.length },
        ].map((stat) => (
          <div
            key={stat.name}
            className="rounded-xl border border-slate-800 bg-slate-900/40 p-5"
          >
            <p className="text-xs text-slate-500">{stat.name}</p>
            <p className="mt-2 text-2xl font-bold">{stat.value ?? "—"}</p>
          </div>
        ))}
      </div>
      {success && (
        <p
          role="status"
          className="mb-5 rounded-lg border border-emerald-900 bg-emerald-950/30 p-4 text-sm text-emerald-300"
        >
          {success}
        </p>
      )}
      <State
        loading={resource.loading}
        error={resource.error}
        retry={resource.refresh}
      />
      {!resource.loading && !resource.error && (
        <>
          {tab === "events" && (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {events.data?.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  image={presentation.eventImages[event.id]}
                />
              ))}
            </div>
          )}
          {tab === "challenges" && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {challenges.data?.map((c) => (
                <article
                  key={c.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 p-5"
                >
                  <div className="flex justify-between">
                    <Badge tone={c.level}>{c.level}</Badge>
                    <Badge>{c.visibility ? "Visible" : "Hidden"}</Badge>
                  </div>
                  <h2 className="mt-5 text-lg font-bold">{c.name}</h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                    {c.description}
                  </p>
                  <p className="mt-4 text-xs text-slate-500">
                    {categories.data?.find((v) => v.id === c.categoryId)
                      ?.name || `Category ${c.categoryId}`}{" "}
                    · Event {c.eventId}
                  </p>
                  <div className="mt-5 flex justify-between border-t border-slate-800 pt-4">
                    <span className="text-sm font-bold text-emerald-400">
                      {c.points} PTS
                    </span>
                    <Link
                      href={`/challenge/${c.id}`}
                      className="flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-400"
                    >
                      View details <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
          {tab === "submissions" && (
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900 text-xs text-slate-500">
                  <tr>
                    {[
                      "Submission",
                      "Agent",
                      "Challenge",
                      "Event",
                      "Points",
                      "Submitted",
                    ].map((v) => (
                      <th key={v} className="p-4 font-medium">
                        {v}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {submissions.data?.map((s) => (
                    <tr
                      key={s.id}
                      className="border-t border-slate-800 text-slate-400"
                    >
                      <td className="p-4" title={s.id}>
                        {s.id.slice(0, 8)}…
                      </td>
                      <td className="p-4">
                        {users.data?.find((u) => u.id === s.userId)?.name ||
                          s.userId}
                      </td>
                      <td className="p-4">
                        {challenges.data?.find((c) => c.id === s.challengeId)
                          ?.name || s.challengeId}
                      </td>
                      <td className="p-4">{s.eventId}</td>
                      <td className="p-4 font-bold text-emerald-400">
                        {s.points}
                      </td>
                      <td className="whitespace-nowrap p-4">
                        {dateLabel(s.submittedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {tab === "users" && (
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900 text-xs text-slate-500">
                  <tr>
                    <th className="p-4 font-medium">Agent</th>
                    <th className="p-4 font-medium">Email</th>
                    <th className="p-4 font-medium">User ID</th>
                  </tr>
                </thead>
                <tbody>
                  {users.data?.map((u) => (
                    <tr key={u.id} className="border-t border-slate-800">
                      <td className="p-4 font-medium">{u.name}</td>
                      <td className="p-4 text-slate-400">{u.email}</td>
                      <td className="p-4 font-mono text-xs text-slate-500">
                        {u.id}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {resource.data?.length === 0 && <State empty={`No ${tab} yet.`} />}
        </>
      )}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] tracking-widest text-emerald-400">
                  NEW OPERATION
                </p>
                <h2 id="create-title" className="mt-1 text-xl font-bold">
                  Create {tab === "events" ? "event" : "challenge"}
                </h2>
              </div>
              <button
                aria-label="Close create form"
                disabled={busy}
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={create} className="space-y-5">
              <Field label="Name">
                <input
                  name="name"
                  required
                  maxLength={256}
                  className={inputClass}
                  placeholder={
                    tab === "events" ? "RAVEN CTF 2026" : "the_endpoint"
                  }
                />
              </Field>
              {tab === "events" ? (
                <>
                  <Field label="Event story">
                    <textarea
                      name="story"
                      required
                      rows={3}
                      className={inputClass}
                      placeholder="Set the scene for your investigation…"
                    />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Start date & time">
                      <input
                        name="startDate"
                        type="datetime-local"
                        required
                        className={inputClass}
                      />
                    </Field>
                    <Field label="End date & time">
                      <input
                        name="endDate"
                        type="datetime-local"
                        required
                        className={inputClass}
                      />
                    </Field>
                  </div>
                  <Field label="Status">
                    <select name="status" className={inputClass}>
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="ended">Ended</option>
                    </select>
                  </Field>
                  <Field label="Cover image URL (optional)">
                    <input
                      name="imageUrl"
                      type="url"
                      className={inputClass}
                      placeholder="https://…/event-cover.jpg"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </Field>
                  <div
                    className="h-32 rounded-lg bg-cover bg-center"
                    role="img"
                    aria-label="Event cover preview"
                    style={{
                      backgroundImage: `url(${JSON.stringify(safeUrl(image) || "/images/event-cover.svg")})`,
                    }}
                  />
                </>
              ) : (
                <>
                  <Field label="Description">
                    <textarea
                      name="description"
                      required
                      rows={3}
                      className={inputClass}
                      placeholder="Explain the challenge and the objective…"
                    />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Difficulty">
                      <select name="level" className={inputClass}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </Field>
                    <Field label="Points">
                      <input
                        name="points"
                        type="number"
                        min={0}
                        max={2147483647}
                        step={1}
                        defaultValue={50}
                        required
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Event">
                      <select
                        name="eventId"
                        required
                        className={inputClass}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select event
                        </option>
                        {events.data?.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.name}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Category">
                      <select
                        name="categoryId"
                        required
                        className={inputClass}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select category
                        </option>
                        {categories.data?.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.name}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <State
                    error={events.error || categories.error}
                    retry={() => {
                      events.refresh();
                      categories.refresh();
                    }}
                  />
                  <label className="flex items-center gap-3 text-sm text-slate-300">
                    <input
                      name="visibility"
                      type="checkbox"
                      defaultChecked
                      className="accent-emerald-400"
                    />
                    Visible in the public challenge registry
                  </label>
                  <details className="rounded-lg border border-slate-700 p-4">
                    <summary className="cursor-pointer text-sm text-slate-300">
                      Optional resources & tags
                    </summary>
                    <div className="mt-5 space-y-4">
                      <Field label="Tags (comma separated)">
                        <input
                          name="tags"
                          className={inputClass}
                          placeholder="HTTP, Recon, Web"
                        />
                      </Field>
                      <Field label="Default environment">
                        <select name="environmentId" className={inputClass}>
                          <option value="">Let the agent choose</option>
                          {environments.data?.map((v) => (
                            <option key={v.id} value={v.id}>
                              #{v.id} —{" "}
                              {v.imageName || v.imageUrl || "Environment"}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="File download URL">
                        <input
                          name="fileUrl"
                          className={inputClass}
                          placeholder="https://…/evidence.zip"
                        />
                      </Field>
                      <Field label="File display name">
                        <input
                          name="fileName"
                          className={inputClass}
                          placeholder="evidence.zip"
                        />
                      </Field>
                    </div>
                  </details>
                </>
              )}
              <State error={formError} />
              <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    busy ||
                    (tab === "challenges" &&
                      (!events.data?.length || !categories.data?.length))
                  }
                  className={buttonClass}
                >
                  {busy
                    ? "Creating…"
                    : "Create " + (tab === "events" ? "event" : "challenge")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
