const STRAPI_URL = process.env.STRAPI_URL || "http://127.0.0.1:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const STRAPI_FETCH_RETRY_DELAYS_MS = [250, 750];

export type StrapiCollectionResponse<T> = {
  data: T[];
  meta: Record<string, unknown>;
};

export type StrapiSingleResponse<T> = {
  data: T;
  meta: Record<string, unknown>;
};

export function getStrapiUrl() {
  return STRAPI_URL;
}

function isRetryableStrapiError(error: unknown) {
  if (!(error instanceof TypeError)) {
    return false;
  }

  const cause = error.cause as { code?: string } | undefined;
  return cause?.code === "ECONNREFUSED" || cause?.code === "ECONNRESET";
}

async function wait(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function strapiFetch<T>(
  path: string,
  init?: RequestInit & { revalidate?: number },
): Promise<T> {
  const headers = new Headers(init?.headers);

  if (!headers.has("Content-Type") && init?.method && init.method !== "GET") {
    headers.set("Content-Type", "application/json");
  }

  if (STRAPI_API_TOKEN) {
    headers.set("Authorization", `Bearer ${STRAPI_API_TOKEN}`);
  }

  const nextConfig =
    init?.method === "GET" && typeof init?.revalidate === "number" && init.revalidate > 0
      ? { revalidate: init.revalidate }
      : undefined;

  let response: Response | null = null;
  let lastError: unknown = null;

  for (let attempt = 0; attempt <= STRAPI_FETCH_RETRY_DELAYS_MS.length; attempt += 1) {
    try {
      response = await fetch(`${STRAPI_URL}${path}`, {
        ...init,
        headers,
        cache: init?.method === "GET" && !nextConfig ? "no-store" : init?.cache,
        next: nextConfig,
      });
      break;
    } catch (error) {
      lastError = error;

      const shouldRetry =
        init?.method === "GET" &&
        attempt < STRAPI_FETCH_RETRY_DELAYS_MS.length &&
        isRetryableStrapiError(error);

      if (!shouldRetry) {
        throw error;
      }

      await wait(STRAPI_FETCH_RETRY_DELAYS_MS[attempt]);
    }
  }

  if (!response) {
    throw lastError instanceof Error ? lastError : new Error("Strapi request failed.");
  }

  if (!response.ok) {
    throw new Error(`Strapi request failed with status ${response.status}.`);
  }

  return (await response.json()) as T;
}
