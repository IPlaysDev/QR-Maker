// Ensures dist/client has an index.html shell so `npx cap sync android`
// (webDir = "dist/client") always succeeds after a Vite build.
import { existsSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const dir = join(process.cwd(), "dist", "client");
mkdirSync(dir, { recursive: true });
const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>QR Maker</title>
    <link rel="icon" href="/favicon.png" type="image/png" />
    <style>html,body{margin:0;background:#000;color:#fff;font-family:system-ui}</style>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;
const target = join(dir, "index.html");
if (!existsSync(target)) writeFileSync(target, html);
console.log("[prepare-capacitor] ensured", target);
