// node render.mjs <scene> <cssW> <cssH> <out.png> [js run inside the Figma iframe after load]
const [, , scene, W, H, out, js] = process.argv;
const port = 9411;
const tab = await (await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent("http://127.0.0.1:7498/scene.html?scene=" + scene)}`, { method: "PUT" })).json();
const ws = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((ok) => ws.addEventListener("open", ok));
let id = 0; const pending = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
const call = (method, params = {}) => new Promise((ok) => { const i = ++id; pending.set(i, ok); ws.send(JSON.stringify({ id: i, method, params })); });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await call("Emulation.setDeviceMetricsOverride", { width: +W, height: +H, deviceScaleFactor: +(process.env.DPR || 2), mobile: false });
await call("Page.reload");
await sleep(2200);
if (js) {
  const r = await call("Runtime.evaluate", { expression: `(async () => { const f = document.getElementById("fig"); const w = f.contentWindow, d = f.contentDocument; ${js} })()`, awaitPromise: true, returnByValue: true });
  if (r.result?.exceptionDetails) console.log("js error:", JSON.stringify(r.result.exceptionDetails.exception?.description));
  await sleep(900);
}
const shot = await call("Page.captureScreenshot", { format: "png" });
(await import("node:fs")).writeFileSync(out, Buffer.from(shot.result.data, "base64"));
await fetch(`http://127.0.0.1:${port}/json/close/${tab.id}`);
ws.close();
console.log("wrote", out);
