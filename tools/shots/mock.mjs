import http from "node:http";
http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Private-Network": "true" });
  if (req.method === "OPTIONS") return res.end();
  if (req.url === "/status") return res.end(JSON.stringify({ ok: true, project: "Launch Campaign.aep" }));
  if (/build$/.test(req.url)) return res.end(JSON.stringify({ ok: true, comps: ["Pricing / Desktop"], stats: { layers: 148, images: 6, precomps: 2 },
    warnings: [
      { node: "Hero photo", msg: "bitmap: image fill" },
      { node: "Headline", msg: "font not installed for AE (Söhne Breit Kräftig) — sent as a bitmap; install it and resend for live text" },
      { node: "Plan card", msg: "shadow spread isn't supported in AE; baked into the card's background bitmap" },
    ] }));
  res.end(JSON.stringify({ ok: true }));
}).listen(7499, "127.0.0.1");
