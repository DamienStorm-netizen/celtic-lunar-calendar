// functions/_middleware.js
export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const p = url.pathname;

  // Add/adjust paths here if you add new backend endpoints
  const needsProxy =
    p.startsWith("/api/") ||
    p.startsWith("/festivals") ||
    p.startsWith("/dynamic-moon-phases") ||
    p.startsWith("/zodiac/");

  if (!needsProxy) return next(); // serve static file normally

  // Backend base URL comes from a CF Pages Environment Variable
  const backend = (env.BACKEND_URL || "").replace(/\/$/, "");
  const target = backend + p + url.search;

  // Clone request and forward
  const init = {
    method: request.method,
    headers: new Headers(request.headers),
    body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
    redirect: "manual",
  };
  // Tidy headers that Workers disallow/override
  init.headers.delete("host");
  init.headers.set("origin", backend);

  const resp = await fetch(target, init);
  // Pass through status/headers/body
  const h = new Headers(resp.headers);
  return new Response(resp.body, { status: resp.status, headers: h });
}