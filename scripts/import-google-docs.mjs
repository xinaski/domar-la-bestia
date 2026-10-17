/**
 * Importa les pestanyes d'un Google Docs com a capítols Markdown.
 *
 * Requisits:
 *   npm install --save-dev googleapis
 *   GOOGLE_DOC_ID=<id> GOOGLE_APPLICATION_CREDENTIALS=<path> node scripts/import-google-docs.mjs
 *
 * Comparteix el document amb el compte de servei configurat, amb accés de lectura.
 * Per seguretat, no esborra cap fitxer existent: escriu en una carpeta de revisió.
 */
import fs from "node:fs";
import path from "node:path";
import { google } from "googleapis";

const documentId = process.env.GOOGLE_DOC_ID;
if (!documentId) throw new Error("Cal definir GOOGLE_DOC_ID.");
const outDir = path.resolve("imports", "instruccions-per-viure-lleugerament-enfadat");
const auth = new google.auth.GoogleAuth({
  scopes: ["https://www.googleapis.com/auth/documents.readonly"],
});
const docs = google.docs({ version: "v1", auth });
const { data } = await docs.documents.get({ documentId, includeTabsContent: true });

const slugify = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const escapeYaml = (s) => JSON.stringify(s);
const escapeMd = (s) => s.replace(/([\\`*_{}\[\]<>])/g, "\\$1");

function getParagraphs(tab) {
  const paragraphs = tab.documentTab?.body?.content || [];
  return paragraphs.flatMap((item) => {
    if (!item.paragraph) return [];
    const text = (item.paragraph.elements || [])
      .map((element) => element.textRun?.content || "")
      .join("").trim();
    return text ? [{ text, style: item.paragraph.paragraphStyle?.namedStyleType }] : [];
  });
}

function flattenTabs(tabs, out = []) {
  for (const tab of tabs || []) {
    out.push(tab);
    flattenTabs(tab.childTabs, out);
  }
  return out;
}

fs.mkdirSync(outDir, { recursive: true });
const manifest = [];
let index = 0;
for (const tab of flattenTabs(data.tabs)) {
  const title = tab.tabProperties?.title || "Sense títol";
  if (/^x\s+/i.test(title)) continue;
  const paragraphs = getParagraphs(tab);
  if (!paragraphs.length) continue;
  const slug = slugify(title);
  const file = `${String(index).padStart(3, "0")}-${slug}.md`;
  const body = paragraphs.map(({ text, style }) =>
    /^HEADING_[1-6]$/.test(style || "") ? `## ${escapeMd(text)}` : escapeMd(text)
  ).join("\n\n");
  const frontmatter = [
    "---", `title: ${escapeYaml(title)}`, `order: ${index}`,
    `type: ${index === 0 ? "synopsis" : "relat"}`, "---", "",
  ].join("\n");
  fs.writeFileSync(path.join(outDir, file), frontmatter + body + "\n");
  manifest.push({ tabId: tab.tabProperties?.tabId, title, file, paragraphs: paragraphs.length });
  index++;
}
fs.writeFileSync(path.join(outDir, "_manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`Importades ${manifest.length} pestanyes a ${outDir}`);
console.log("Revisa els fitxers abans de moure'ls a src/content/books.");
