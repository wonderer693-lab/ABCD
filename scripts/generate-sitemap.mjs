import { writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const dataPath = join(__dirname, "..", "data", "saas_data.json");
const raw = readFileSync(dataPath, "utf-8");
const data = JSON.parse(raw);
const tools = Array.isArray(data) ? data : data.tools;

const BASE = "https://saaspole.vercel.app";

const routes = [
  { path: "", priority: 1.0, changefreq: "weekly" },
  { path: "/best", priority: 0.9, changefreq: "weekly" },
  ...tools.map((t) => ({ path: `/compare/${t.saas_id}-alternatives`, priority: 0.8, changefreq: "monthly" })),
];

const urls = routes
  .map(
    (r) => `  <url>
    <loc>${BASE}${r.path}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

const outDir = join(__dirname, "..", "public");
writeFileSync(join(outDir, "sitemap.xml"), sitemap, "utf-8");
console.log(`Sitemap generated at public/sitemap.xml with ${routes.length} routes`);
