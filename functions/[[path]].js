// functions/api/[[path]].js
export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  const backend = (env.BACKEND_URL || '').replace(/\/$/, '');

  // forward /api/* → BACKEND_URL/*
  const target = backend + url.pathname.replace(/^\/api/, '') + url.search;

  const init = {
    method: request.method,
    headers: request.headers,
    body: ['GET','HEAD'].includes(request.method) ? undefined : await request.clone().arrayBuffer(),
  };

  const resp = await fetch(target, { ...init, cf: { cacheTtl: 0, cacheEverything: false } });
  return new Response(resp.body, { status: resp.status, headers: resp.headers });
}