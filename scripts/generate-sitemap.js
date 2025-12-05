import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const sitemapPath = path.join(publicDir, "sitemap.xml");

const baseUrl = (process.env.SITE_BASE_URL || "https://sergioantezana.com").replace(/\/$/, "");

const routeConfigs = [
  {
    path: "/",
    sources: [
      "src/App.jsx",
      "src/sections/HeroSection.jsx",
      "src/sections/AboutSection.jsx",
      "src/sections/PhilosophySection.jsx",
      "src/sections/HowIWork.jsx",
      "src/sections/ContactSection.jsx",
    ],
  },
  { path: "/portfolio", sources: ["src/pages/Portfolio.jsx"] },
  { path: "/resume", sources: ["src/pages/MyResume.jsx"] },
  { path: "/wip", sources: ["src/pages/WhatImWorkingOn.jsx"] },
  {
    path: "/case-studies/low-code-case-management",
    sources: ["src/pages/CaseStudyLowCode.jsx"],
  },
  {
    path: "/case-studies/portfolio-and-resume-system",
    sources: ["src/pages/CaseStudyPortfolioSystem.jsx"],
  },
];

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

async function getLatestModifiedDate(sourcePaths) {
  const absolutePaths = sourcePaths.map((source) => path.join(projectRoot, source));
  const stats = await Promise.all(absolutePaths.map((file) => fs.stat(file)));
  const latest = stats.reduce((max, stat) => {
    return stat.mtime > max ? stat.mtime : max;
  }, stats[0].mtime);
  return latest;
}

async function buildUrlEntries() {
  const entries = [];

  for (const route of routeConfigs) {
    const lastmod = await getLatestModifiedDate(route.sources);
    entries.push({
      loc: `${baseUrl}${route.path}`,
      lastmod: formatDate(lastmod),
    });
  }

  return entries;
}

function buildXml(urlEntries) {
  const urls = urlEntries
    .map(
      ({ loc, lastmod }) =>
        `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function writeSitemap(contents) {
  await fs.mkdir(publicDir, { recursive: true });
  await fs.writeFile(sitemapPath, contents, "utf8");
}

async function generateSitemap() {
  const urlEntries = await buildUrlEntries();
  const sitemapXml = buildXml(urlEntries);
  await writeSitemap(sitemapXml);
  console.log(`Sitemap generated at ${sitemapPath}`);
}

generateSitemap().catch((error) => {
  console.error("Failed to generate sitemap", error);
  process.exit(1);
});
