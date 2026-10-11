import { apiFetch } from "@/lib/auth";

export type UploadedAsset = {
  url: string;
};

export type UploadResponse = {
  message: string;
  data: UploadedAsset;
};

export async function uploadAsset(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  return apiFetch<UploadResponse>("/file/upload", {
    method: "POST",
    body: formData,
  });
}
