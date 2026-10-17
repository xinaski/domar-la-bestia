<template>
  <main class="reading-page">
    <article v-if="book && chapter" class="reading-layout">
      <nav class="reading-breadcrumb" aria-label="Ruta de navegació">
        <RouterLink to="/">Inici</RouterLink>
        <span aria-hidden="true">/</span>
        <RouterLink :to="`/llibres/${bookSlug}`">{{ book.title }}</RouterLink>
      </nav>

      <header class="reading-header">
        <RouterLink class="back-link" :to="`/llibres/${bookSlug}`">← Tornar a l'índex</RouterLink>
        <p class="chapter-kicker">{{ book.title }} <span aria-hidden="true">—</span> {{ chapter.type === 'relat' ? 'RELAT' : chapter.type === 'section' ? 'PART' : 'CAPÍTOL' }}</p>
        <h1>{{ chapter.title }}</h1>
        <p v-if="chapter.date" class="chapter-date">{{ chapter.date }}</p>
      </header>

      <div class="reading-body" v-html="chapter.html" />

      <footer class="reading-footer">
        <p class="end-mark" aria-hidden="true">✳</p>
        <nav class="chapter-nav" aria-label="Navegació entre capítols">
          <RouterLink v-if="previousChapter" :to="`/llibres/${bookSlug}/${previousChapter.slug}`" class="chapter-nav-link">
            <span class="nav-label">← Anterior</span>
            <span class="nav-title">{{ previousChapter.title }}</span>
          </RouterLink>
          <span v-else />
          <RouterLink v-if="nextChapter" :to="`/llibres/${bookSlug}/${nextChapter.slug}`" class="chapter-nav-link next-link">
            <span class="nav-label">Següent →</span>
            <span class="nav-title">{{ nextChapter.title }}</span>
          </RouterLink>
          <span v-else />
        </nav>
        <RouterLink class="return-index" :to="`/llibres/${bookSlug}`">Veure tots els relats ↗</RouterLink>
      </footer>
    </article>

    <section v-else class="missing">
      <h1>No trobo aquest relat.</h1>
      <RouterLink :to="`/llibres/${bookSlug}`">← Tornar a l'índex</RouterLink>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { booksBySlug } from "../content.gen";

const route = useRoute();
const bookSlug = computed(() => String(route.params.bookSlug || ""));
const chapterSlug = computed(() => String(route.params.chapterSlug || ""));
const book = computed(() => booksBySlug[bookSlug.value] ?? (bookSlug.value === "instruccions-per-viure-lleugerament-enfadat" ? booksBySlug["no-hi-ha-per-tant"] : undefined));
const chapter = computed(() => book.value?.chapters.find((item) => item.slug === chapterSlug.value));
const chapterIndex = computed(() => book.value?.chapters.findIndex((item) => item.slug === chapterSlug.value) ?? -1);
const previousChapter = computed(() => chapterIndex.value > 0 ? book.value?.chapters[chapterIndex.value - 1] : undefined);
const nextChapter = computed(() => chapterIndex.value >= 0 ? book.value?.chapters[chapterIndex.value + 1] : undefined);
</script>

<style scoped>
.reading-page { --ink: #171717; --muted: #777; min-height: 75vh; padding: clamp(34px, 4.5vw, 72px) clamp(22px, 2.7vw, 48px) clamp(85px, 9vw, 150px); color: var(--ink); background: #fff; }
.reading-layout { width: 100%; max-width: 1140px; margin: 0 auto; }
.reading-breadcrumb { display: flex; align-items: baseline; flex-wrap: wrap; gap: 12px; font: 400 11px/1.6 'DM Mono', monospace; color: var(--muted); }
.reading-breadcrumb a { color: inherit; text-decoration: none; }
.reading-breadcrumb a:hover { color: var(--ink); }
.reading-header { max-width: 850px; margin: clamp(80px, 10vw, 150px) auto 0; text-align: center; }
.back-link { display: inline-block; color: var(--ink); text-decoration: none; font: 400 11px/1.5 'DM Mono', monospace; }
.back-link:hover, .return-index:hover { opacity: .55; }
.chapter-kicker { margin: 56px 0 22px; font: 500 10px/1.7 'DM Mono', monospace; letter-spacing: .15em; text-transform: uppercase; }
.chapter-kicker span { margin: 0 7px; }
.reading-header h1 { margin: 0; font: 400 clamp(55px, 7.5vw, 112px)/1.02 'Bodoni Moda', Georgia, serif; letter-spacing: -.06em; text-wrap: balance; }
.chapter-date { margin: 28px 0 0; color: var(--muted); font: 400 11px/1.5 'DM Mono', monospace; }
.reading-body { width: min(100%, 690px); margin: clamp(90px, 10vw, 145px) auto 0; font: 400 clamp(18px, 1.5vw, 21px)/1.85 'Fraunces', Georgia, serif; font-optical-sizing: auto; overflow-wrap: break-word; }
.reading-body :deep(p) { margin: 0 0 1.35em; }
.reading-body :deep(h2) { margin: 2.6em 0 .8em; font: 400 clamp(32px, 4vw, 50px)/1.15 'Bodoni Moda', Georgia, serif; letter-spacing: -.035em; }
.reading-body :deep(h3) { margin: 2.2em 0 .7em; font: 500 clamp(24px, 3vw, 33px)/1.2 'Fraunces', Georgia, serif; }
.reading-body :deep(blockquote) { margin: 2.2em 0; padding: .25em 0 .25em 1.3em; border-left: 1px solid #999; color: #555; font-style: italic; }
.reading-body :deep(blockquote p:last-child) { margin-bottom: 0; }
.reading-body :deep(ul), .reading-body :deep(ol) { margin: 1.4em 0; padding-left: 1.4em; }
.reading-body :deep(li) { margin-bottom: .65em; }
.reading-body :deep(a) { color: inherit; text-decoration: underline; text-underline-offset: 4px; }
.reading-body :deep(hr) { border: 0; border-top: 1px solid #ddd; margin: 3em 0; }
.reading-body :deep(img) { max-width: 100%; height: auto; }
.reading-footer { max-width: 850px; margin: clamp(80px, 10vw, 145px) auto 0; text-align: center; }
.end-mark { margin: 0 0 65px; font-size: 18px; }
.chapter-nav { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 30px; border-top: 1px solid #1c1c1c; border-bottom: 1px solid #ddd; padding: 30px 0 36px; text-align: left; }
.chapter-nav-link { display: flex; flex-direction: column; gap: 12px; color: inherit; text-decoration: none; }
.chapter-nav-link:hover { opacity: .6; }
.next-link { text-align: right; }
.nav-label { color: var(--muted); font: 400 11px/1.5 'DM Mono', monospace; }
.nav-title { font: 400 clamp(20px, 2.5vw, 33px)/1.25 'Fraunces', Georgia, serif; }
.return-index { display: inline-block; margin-top: 42px; color: inherit; text-decoration: none; font: 500 11px/1.5 'DM Mono', monospace; }
.missing { max-width: 850px; margin: 90px auto; }
.missing h1 { font: 400 42px/1.2 'Bodoni Moda', Georgia, serif; }
.missing a { color: inherit; }
@media (max-width: 720px) {
  .reading-header { margin-top: 75px; }
  .chapter-kicker { margin-top: 45px; }
  .reading-header h1 { font-size: clamp(52px, 11vw, 78px); }
  .reading-body { margin-top: 75px; font-size: 18px; line-height: 1.8; }
  .reading-footer { margin-top: 90px; }
  .chapter-nav { gap: 18px; }
  .nav-title { font-size: 20px; }
}
@media (max-width: 390px) {
  .reading-header h1 { font-size: 48px; }
  .chapter-nav { gap: 12px; }
  .nav-title { font-size: 18px; }
}
</style>
