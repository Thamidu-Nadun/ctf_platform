"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { getChallenges } from "@/services/challenge.service";
import {
  createFlag,
  deleteFlag,
  getFlags,
  updateFlag,
  type Flag,
} from "@/services/flag.service";
import {
  createHint,
  deleteHint,
  getHints,
  updateHint,
  type Hint,
} from "@/services/hint.service";
import { Field, State, buttonClass, inputClass } from "./ui";
import type { Challenge } from "@/lib/platform";

type Resource = "hints" | "flags";
type RecordItem = Hint | Flag;

function isHintRecord(item: RecordItem): item is Hint {
  return "hintText" in item;
}

function useResource<T>(load: () => Promise<T>) {
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
      .then((value) => active && setData(value))
      .catch((reason: Error) => active && setError(reason.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [load, revision]);

  return { data, loading, error, refresh };
}

export default function DashboardHintFlagPanel({
  resource,
}: {
  resource: Resource;
}) {
  const isHint = resource === "hints";
  const records = useResource<RecordItem[]>(isHint ? getHints : getFlags);
  const challenges = useResource<Challenge[]>(getChallenges);
  const [editing, setEditing] = useState<RecordItem | null>(null);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");

  const challengeName = (challengeId: number) =>
    challenges.data?.find((challenge) => challenge.id === challengeId)?.name ||
    `Challenge #${challengeId}`;

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const challengeId = Number(form.get("challengeId"));
    const text = String(form.get("text") || "").trim();
    const cost = Number(form.get("cost") || 0);
    setBusy(true);
    setFormError("");
    setSuccess("");
    try {
      if (!challengeId || !text)
        throw new Error("Complete all required fields.");
      if (isHint && (!Number.isInteger(cost) || cost < 0))
        throw new Error("Hint cost must be a whole number of points.");
      if (editing) {
        if (isHint) await updateHint(editing.id, text, cost);
        else await updateFlag(editing.challengeId, text);
      } else if (isHint) {
        await createHint(challengeId, text, cost);
      } else {
        await createFlag(challengeId, text);
      }
      records.refresh();
      setEditing(null);
      setSuccess(`${isHint ? "Hint" : "Flag"} saved successfully.`);
    } catch (reason) {
      setFormError(
        reason instanceof Error ? reason.message : "Could not save the record.",
      );
    } finally {
      setBusy(false);
    }
  };

  const remove = async (item: RecordItem) => {
    if (!window.confirm(`Delete this ${isHint ? "hint" : "flag"}?`)) return;
    setBusy(true);
    setFormError("");
    setSuccess("");
    try {
      if (isHint) await deleteHint(item.id);
      else await deleteFlag(item.challengeId);
      records.refresh();
      setSuccess(`${isHint ? "Hint" : "Flag"} deleted successfully.`);
    } catch (reason) {
      setFormError(
        reason instanceof Error
          ? reason.message
          : "Could not delete the record.",
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
            CONTROL CENTER / {resource.toUpperCase()}
          </p>
          <h1 className="mt-3 text-3xl font-black">
            {isHint ? "Hints" : "Flags"}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {isHint
              ? "Give investigators optional clues and point costs."
              : "Manage the verification tokens for each challenge."}
          </p>
        </div>
        <button
          className={buttonClass}
          onClick={() => {
            setEditing(null);
            setFormError("");
          }}
        >
          <Plus size={17} /> New {isHint ? "hint" : "flag"}
        </button>
      </div>
      {success && (
        <p
          role="status"
          className="mb-5 rounded-lg border border-emerald-900 bg-emerald-950/30 p-4 text-sm text-emerald-300"
        >
          {success}
        </p>
      )}
      {formError && (
        <p
          role="alert"
          className="mb-5 rounded-lg border border-red-900 bg-red-950/30 p-4 text-sm text-red-300"
        >
          {formError}
        </p>
      )}
      <State
        loading={records.loading || challenges.loading}
        error={records.error || challenges.error}
        retry={() => {
          records.refresh();
          challenges.refresh();
        }}
      />
      {!records.loading &&
        !records.error &&
        !challenges.loading &&
        !challenges.error &&
        (records.data?.length ? (
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900 text-xs text-slate-500">
                <tr>
                  <th className="p-4 font-medium">Challenge</th>
                  <th className="p-4 font-medium">
                    {isHint ? "Hint" : "Flag"}
                  </th>
                  {isHint && <th className="p-4 font-medium">Cost</th>}
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.data.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-slate-800 text-slate-300"
                  >
                    <td className="p-4 font-medium">
                      {challengeName(item.challengeId)}
                    </td>
                    <td className="max-w-xl whitespace-pre-wrap p-4 text-slate-400">
                      {isHintRecord(item) ? item.hintText : item.flagText}
                    </td>
                    {isHint && (
                      <td className="p-4 text-emerald-400">
                        {isHintRecord(item) ? item.cost : 0} pts
                      </td>
                    )}
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          title="Edit"
                          aria-label={`Edit ${isHint ? "hint" : "flag"}`}
                          disabled={busy}
                          onClick={() => setEditing(item)}
                          className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-emerald-400"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          title="Delete"
                          aria-label={`Delete ${isHint ? "hint" : "flag"}`}
                          disabled={busy}
                          onClick={() => remove(item)}
                          className="rounded-lg p-2 text-slate-400 hover:bg-red-950 hover:text-red-300"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <State empty={`No ${resource} yet.`} />
        ))}
      {(editing || editing === null) && (
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/50 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] tracking-widest text-emerald-400">
                {editing ? "EDIT RECORD" : "NEW OPERATION"}
              </p>
              <h2 className="mt-1 text-xl font-bold">
                {editing ? "Edit" : "Create"} {isHint ? "hint" : "flag"}
              </h2>
            </div>
            {editing && (
              <button
                aria-label="Close edit form"
                onClick={() => setEditing(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            )}
          </div>
          <form
            onSubmit={save}
            className="grid gap-5 md:grid-cols-[1fr_2fr_auto] md:items-end"
          >
            <Field label="Challenge">
              <select
                name="challengeId"
                required
                disabled={Boolean(editing)}
                defaultValue={editing?.challengeId || ""}
                className={inputClass}
              >
                <option value="" disabled>
                  Select challenge
                </option>
                {challenges.data?.map((challenge) => (
                  <option key={challenge.id} value={challenge.id}>
                    {challenge.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={isHint ? "Hint text" : "Flag text"}>
              <input
                name="text"
                required
                defaultValue={
                  editing && isHintRecord(editing)
                    ? editing.hintText
                    : editing && !isHintRecord(editing)
                      ? editing.flagText
                      : ""
                }
                className={inputClass}
                placeholder={isHint ? "A clue that costs points…" : "flag{…}"}
              />
            </Field>
            {isHint && (
              <Field label="Cost">
                <input
                  name="cost"
                  type="number"
                  min={0}
                  step={1}
                  required
                  defaultValue={
                    editing && isHintRecord(editing) ? editing.cost : 0
                  }
                  className={inputClass}
                />
              </Field>
            )}
            <button disabled={busy} className={buttonClass}>
              {busy ? "Saving…" : editing ? "Save changes" : "Create"}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
