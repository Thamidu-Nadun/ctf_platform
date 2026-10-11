const API_URL = process.env.API_URL || "http://localhost:3000";

export const apiFetch = async <T = unknown>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const isFormData = options.body instanceof FormData;
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data as T;
};
