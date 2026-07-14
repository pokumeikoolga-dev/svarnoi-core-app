import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Svarnoi landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="ru">/i);
  assert.match(html, /<title>Первый Сварной — сварочные работы в Минске<\/title>/i);
  assert.match(html, /id="hero-title"/i);
  assert.match(html, /Записаться На Бесплатную Диагностику/i);
  assert.match(html, /href="tel:\+375333771440"/i);
  assert.match(html, /Примеры работ/i);
});

test("keeps the project identity and landing assets explicit", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(packageJson, /"name": "svarnoi-core-app"/);
  assert.match(page, /const heroCards = \[/);
  assert.match(page, /hero-card-5\.png/);
  assert.match(page, /href="tel:\+375333771440"/);
  assert.match(layout, /<html lang="ru">/);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
});
