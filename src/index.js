// src/index.js (modules syntax)
export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(fetch("https://lunar-almanac-backend.onrender.com/health", { cache: "no-store" }));
  }
};