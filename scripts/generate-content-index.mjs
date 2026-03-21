import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
marked.setOptions({
  breaks: true,
});

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "src", "content", "books");
const OUT_FILE = path.join(ROOT, "src", "content.gen.ts");

const dirs = fs.readdirSync(CONTENT_DIR, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);

const books = dirs.map((dirName) => {
  const bookDir = path.join(CONTENT_DIR, dirName);
  const meta = JSON.parse(fs.readFileSync(path.join(bookDir, "_book.json"), "utf-8"));

  const mdFiles = fs.readdirSync(bookDir).filter(f => f.endsWith(".md")).sort();

  const chapters = mdFiles.map((file) => {
    const raw = fs.readFileSync(path.join(bookDir, file), "utf-8");
    const parsed = matter(raw);
    const slug = file.replace(/\.md$/, "");
    const order = typeof parsed.data.order === "number" ? parsed.data.order : Number((slug.match(/^(\d+)-/) || [])[1] || 9999);
    return {
      slug,
      title: parsed.data.title || slug,
      order,
      date: parsed.data.date || "",
      type: parsed.data.type || "chapter",
      html: marked.parse(parsed.content),
    };
  }).sort((a,b) => a.order - b.order);

  const nav = {};
  chapters.forEach((ch, i) => {
    nav[ch.slug] = { prev: i ? chapters[i-1].slug : null, next: i < chapters.length-1 ? chapters[i+1].slug : null };
  });

  return {
    slug: meta.slug || dirName,
    title: meta.title || dirName,
    subtitle: meta.subtitle || "",
    order: meta.order ?? 999,
    description: meta.description || "",
    cover: meta.cover || "",
    pdf: meta.pdf || "",
    chapters,
    nav,
  };
}).sort((a,b) => a.order - b.order);

const booksBySlug = Object.fromEntries(books.map(b => [b.slug, b]));

const out = `/* AUTO-GENERATED. DO NOT EDIT. */
export const books = ${JSON.stringify(books, null, 2)} as const;
export const booksBySlug = ${JSON.stringify(booksBySlug, null, 2)} as const;
`;

fs.writeFileSync(OUT_FILE, out, "utf-8");
console.log("✅ Generated src/content.gen.ts (" + books.length + " books)");