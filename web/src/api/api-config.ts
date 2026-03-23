const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
const API_TOKEN =  process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export async function strapi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}/api${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Strapi error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}