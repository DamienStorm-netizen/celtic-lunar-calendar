// functions/api/[[path]].js
export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  const backend = (env.BACKEND_URL || "").replace(/\/$/, "");

  // Forward /api/* → BACKEND_URL/* (strip the /api prefix)
  const target = backend + url.pathname.replace(/^\/api/, "") + url.search;

  // Clone and clean headers (Workers disallow overriding certain ones)
  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.set("origin", backend);

  const init = {
    method: request.method,
    headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
    redirect: "manual",
    // Avoid edge caching for dynamic API responses
    cf: { cacheTtl: 0, cacheEverything: false },
  };

  const resp = await fetch(target, init);

  // Pass through status/headers/body as-is
  const outHeaders = new Headers(resp.headers);
  return new Response(resp.body, { status: resp.status, headers: outHeaders });
}