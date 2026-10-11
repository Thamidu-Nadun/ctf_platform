"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Container, Plus, Trash2 } from "lucide-react";
import {
  createEnvironment,
  deleteEnvironment,
  getEnvironments,
  type Environment,
} from "@/services/environment.service";
import {
  Field,
  State,
  buttonClass,
  inputClass,
} from "@/Components/platform/ui";

export default function EnvironmentsPage() {
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadEnvironments = async () => {
    setLoading(true);
    setError("");
    try {
      setEnvironments(await getEnvironments());
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Could not load environments.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    getEnvironments()
      .then((data) => {
        if (active) setEnvironments(data);
      })
      .catch((reason) => {
        if (active) {
          setError(
            reason instanceof Error
              ? reason.message
              : "Could not load environments.",
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const create = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const imageUrl = String(data.get("imageUrl") || "").trim();
    const repoUrl = String(data.get("repoUrl") || "").trim();

    setBusy(true);
    setError("");
    setSuccess("");
    try {
      await createEnvironment({ imageUrl, repoUrl });
      form.reset();
      await loadEnvironments();
      setSuccess("Environment created successfully.");
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Could not create the environment.",
      );
    } finally {
      setBusy(false);
    }
  };

  const remove = async (environmentId: number) => {
    setDeletingId(environmentId);
    setError("");
    setSuccess("");
    try {
      await deleteEnvironment(environmentId);
      setEnvironments((current) =>
        current.filter((environment) => environment.id !== environmentId),
      );
      setSuccess("Environment deleted successfully.");
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Could not delete the environment.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="mx-auto max-w-6xl p-5 md:p-8">
      <div className="mb-8">
        <p className="text-[10px] font-semibold tracking-[.2em] text-emerald-400">
          CONTROL CENTER / ENVIRONMENTS
        </p>
        <h1 className="mt-3 text-3xl font-black">Environments</h1>
        <p className="mt-2 text-sm text-slate-500">
          Register container images that challenges can launch for participants.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <form
          onSubmit={create}
          className="h-fit rounded-xl border border-slate-800 bg-slate-900/50 p-6"
        >
          <div className="mb-6 flex items-center gap-3">
            <Container className="text-emerald-400" size={22} />
            <h2 className="font-bold">Add environment</h2>
          </div>
          <div className="space-y-5">
            <Field label="Container image">
              <input
                name="imageUrl"
                required
                placeholder="raven/target:latest"
                className={inputClass}
              />
            </Field>
            <Field label="Repository URL">
              <input
                name="repoUrl"
                type="url"
                required
                placeholder="https://github.com/org/repository"
                className={inputClass}
              />
            </Field>
          </div>
          <button
            type="submit"
            disabled={busy}
            className={`${buttonClass} mt-6 w-full`}
          >
            <Plus size={16} />
            {busy ? "Creating..." : "Create environment"}
          </button>
        </form>

        <div>
          <State loading={loading} error={error} retry={loadEnvironments} />
          {!loading && !error && environments.length === 0 && (
            <State empty="No environments are configured yet." />
          )}
          {!loading && environments.length > 0 && (
            <div className="space-y-3">
              {environments.map((environment) => (
                <article
                  key={environment.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-5"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-100">
                      {environment.imageName || "Unnamed image"}
                    </p>
                    <a
                      href={environment.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block truncate text-sm text-emerald-400 hover:text-emerald-300"
                    >
                      {environment.repoUrl}
                    </a>
                    <p className="mt-2 text-xs text-slate-600">
                      Environment #{environment.id}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => void remove(environment.id)}
                    disabled={deletingId === environment.id}
                    aria-label={`Delete ${environment.imageName || "environment"}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-900 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-950/40 disabled:opacity-40"
                  >
                    <Trash2 size={15} />
                    {deletingId === environment.id ? "Deleting..." : "Delete"}
                  </button>
                </article>
              ))}
            </div>
          )}
          {success && (
            <p role="status" className="mt-4 text-sm text-emerald-300">
              {success}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
