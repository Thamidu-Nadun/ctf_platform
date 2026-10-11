"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Check, Clipboard, FileUp, UploadCloud } from "lucide-react";
import { uploadAsset } from "@/services/file.service";
import { State, buttonClass, inputClass } from "@/Components/platform/ui";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function UploadPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const chooseFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] || null;
    setError("");
    setUploadedUrl("");
    setCopied(false);

    if (selected && selected.size > MAX_FILE_SIZE) {
      setFile(null);
      setError("Files must be 10 MB or smaller.");
      return;
    }

    setFile(selected);
  };

  const upload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setError("Choose a file before uploading.");
      return;
    }

    setBusy(true);
    setError("");
    setUploadedUrl("");
    setCopied(false);
    try {
      const result = await uploadAsset(file);
      setUploadedUrl(result.data.url);
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Could not upload the file.",
      );
    } finally {
      setBusy(false);
    }
  };

  const copyUrl = async () => {
    if (!uploadedUrl) return;
    await navigator.clipboard.writeText(uploadedUrl);
    setCopied(true);
  };

  return (
    <section className="mx-auto max-w-4xl p-5 md:p-8">
      <div className="mb-8">
        <p className="text-[10px] font-semibold tracking-[.2em] text-emerald-400">
          CONTROL CENTER / ASSETS
        </p>
        <h1 className="mt-3 text-3xl font-black">Upload asset</h1>
        <p className="mt-2 text-sm text-slate-500">
          Store files for challenge evidence, event covers, and platform
          resources.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <form
          onSubmit={upload}
          className="rounded-xl border border-slate-800 bg-slate-900/50 p-6"
        >
          <label
            htmlFor="asset-file"
            className="mb-3 block text-sm font-medium text-slate-200"
          >
            Asset file
          </label>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex min-h-48 w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950/60 p-6 text-center transition hover:border-emerald-500/70 hover:bg-emerald-950/10"
          >
            <UploadCloud size={30} className="mb-3 text-emerald-400" />
            <span className="text-sm font-semibold text-slate-200">
              {file ? file.name : "Choose a file to upload"}
            </span>
            <span className="mt-2 text-xs text-slate-500">
              Maximum file size: 10 MB
            </span>
          </button>
          <input
            ref={inputRef}
            id="asset-file"
            type="file"
            onChange={chooseFile}
            className="sr-only"
          />
          {file && (
            <div className="mt-4 flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950 p-3">
              <FileUp size={18} className="shrink-0 text-emerald-400" />
              <div className="min-w-0">
                <p className="truncate text-sm text-slate-200">{file.name}</p>
                <p className="text-xs text-slate-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={busy || !file}
              className={buttonClass}
            >
              <FileUp size={16} />
              {busy ? "Uploading..." : "Upload asset"}
            </button>
          </div>
          <State error={error} />
        </form>

        <aside className="rounded-xl border border-slate-800 bg-slate-900/30 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Uploaded URL
          </p>
          {uploadedUrl ? (
            <>
              <p className="mt-4 break-all rounded-lg bg-slate-950 p-3 text-xs leading-5 text-emerald-300">
                {uploadedUrl}
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={copyUrl}
                  className={`${inputClass} flex items-center justify-center gap-2 text-xs`}
                >
                  {copied ? <Check size={14} /> : <Clipboard size={14} />}
                  {copied ? "Copied" : "Copy URL"}
                </button>
                <a
                  href={uploadedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${buttonClass} text-xs`}
                >
                  Open
                </a>
              </div>
            </>
          ) : (
            <p className="mt-4 text-sm leading-6 text-slate-500">
              The asset URL will appear here after a successful upload.
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}
