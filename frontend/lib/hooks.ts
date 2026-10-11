"use client";
import { useCallback, useEffect, useState } from "react";
import {
  api,
  emptyPresentation,
  presentationKey,
  type Presentation,
} from "./platform";

export function useResource<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);
  const refresh = useCallback(() => setRevision((value) => value + 1), []);
  useEffect(() => {
    const controller = new AbortController();
    api<T>(path, { signal: controller.signal })
      .then((value) => {
        if (!controller.signal.aborted) {
          setData(value);
          setError("");
        }
      })
      .catch((err: Error) => {
        if (!controller.signal.aborted) setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [path, revision]);
  return { data, loading, error, refresh };
}
export function usePresentation() {
  const [presentation, setPresentation] =
    useState<Presentation>(emptyPresentation);
  useEffect(() => {
    const load = () => {
      try {
        const stored = JSON.parse(
          localStorage.getItem(presentationKey) || "null",
        );
        setPresentation(
          stored && typeof stored === "object"
            ? {
                eventImages: stored.eventImages || {},
                challenges: stored.challenges || {},
              }
            : emptyPresentation,
        );
      } catch {
        setPresentation(emptyPresentation);
      }
    };
    load();
    window.addEventListener("storage", load);
    window.addEventListener("raven:presentation", load);
    return () => {
      window.removeEventListener("storage", load);
      window.removeEventListener("raven:presentation", load);
    };
  }, []);
  const save = (next: Presentation) => {
    localStorage.setItem(presentationKey, JSON.stringify(next));
    setPresentation(next);
    window.dispatchEvent(new Event("raven:presentation"));
  };
  return { presentation, save };
}
