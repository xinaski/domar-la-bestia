<template>
  <main class="book-page">
    <template v-if="bookData">
      <nav class="breadcrumb" aria-label="Ruta de navegació">
        <RouterLink to="/">Inici</RouterLink><span aria-hidden="true">/</span><span>{{ bookData.title }}</span>
      </nav>

      <section class="book-hero" aria-labelledby="book-title">
        <div class="book-cover">
          <img v-if="bookData.cover" :src="editorialCover || bookData.cover" :alt="`Coberta de ${bookData.title}`" />
        </div>
        <div class="book-intro">
          <p class="eyebrow">DOMAR LA BÈSTIA <span aria-hidden="true">—</span> LLIBRE {{ String(bookData.order || 1).padStart(2, '0') }}</p>
          <h1 id="book-title">{{ bookData.title }}</h1>
          <p v-if="bookData.subtitle" class="book-subtitle">{{ bookData.subtitle }}</p>
          <div v-if="bookData.description?.length" class="book-description">
            <p v-for="(paragraph, i) in bookData.description" :key="i">{{ paragraph }}</p>
          </div>
          <div class="book-actions">
            <RouterLink v-if="firstReadable" class="read-link" :to="`/llibres/${bookData.slug}/${firstReadable.slug}`">Començar a llegir <span aria-hidden="true">↗</span></RouterLink>
            <a v-if="bookData.pdf" class="download-link" :href="bookData.pdf" download>Descarregar PDF <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>

      <section class="contents" aria-labelledby="contents-title">
        <div class="contents-heading"><p class="eyebrow">CONTINGUT</p><h2 id="contents-title">Índex</h2></div>
        <ol class="chapter-list">
          <li v-for="(ch, index) in chapters" :key="ch.slug" :class="{ 'is-section': ch.type === 'section' }">
            <template v-if="ch.type === 'section'">
              <span class="chapter-number">{{ String(index + 1).padStart(2, '0') }}</span>
              <RouterLink :to="`/llibres/${bookData.slug}/${firstChildSlug(ch.slug)}`">{{ ch.title }} <span aria-hidden="true">↗</span></RouterLink>
            </template>
            <template v-else>
              <span class="chapter-number">{{ String(index + 1).padStart(2, '0') }}</span>
              <RouterLink :to="`/llibres/${bookData.slug}/${ch.slug}`">{{ ch.title }} <span aria-hidden="true">↗</span></RouterLink>
            </template>
          </li>
        </ol>
      </section>
      <RouterLink class="back-home" to="/">← Tornar a tots els llibres</RouterLink>
    </template>
    <section v-else class="missing"><h1>No trobo aquest llibre.</h1><RouterLink to="/">← Tornar a l'inici</RouterLink></section>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { booksBySlug } from "../content.gen";

const route = useRoute();
const bookSlug = computed(() => {
  const value = route.params.bookSlug;
  return Array.isArray(value) ? value[0] : String(value || "");
});
const bookData = computed(() => booksBySlug[bookSlug.value]);
const chapters = computed(() => bookData.value?.chapters ?? []);
const editorialCovers: Record<string, string> = {
  "caure-lentament": "/images/home/caure-lentament.webp",
  "dignitat-marxar-tard": "/images/home/dignitat-marxar-tard.webp",
  "viure-enfadat": "/images/home/viure-enfadat.webp",
  "cansament-de-ser": "/images/home/cansament-de-ser.webp",
};
const editorialCover = computed(() => editorialCovers[bookSlug.value] || "");
const firstReadable = computed(() => chapters.value.find((ch) => ch.type !== "section"));
function firstChildSlug(sectionSlug: string) {
  const list = chapters.value;
  const index = list.findIndex((ch) => ch.slug === sectionSlug);
  if (index < 0) return sectionSlug;
  for (let i = index + 1; i < list.length; i++) {
    if (list[i]?.type !== "section") return list[i].slug;
  }
  return sectionSlug;
}
</script>

<style scoped>
.book-page { width: min(100% - 2 * var(--page-gutter, 24px), 1250px); margin: 0 auto; padding: clamp(32px, 4vw, 65px) 0 110px; }
.breadcrumb { display: flex; gap: 12px; align-items: center; color: #777; font: 400 11px/1.5 'DM Mono', monospace; }
.breadcrumb a, .back-home, .missing a { color: inherit; text-decoration: none; }
.breadcrumb a:hover, .back-home:hover, .missing a:hover { text-decoration: underline; }
.book-hero { display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1fr); gap: clamp(45px, 8vw, 140px); align-items: center; margin-top: clamp(42px, 6vw, 90px); }
.book-cover { width: 100%; background: #f4f2ef; }
.book-cover img { display: block; width: 100%; aspect-ratio: 4 / 5; object-fit: cover; }
.book-intro { max-width: 580px; }
.eyebrow { margin: 0; font: 500 11px/1.5 'DM Mono', monospace; letter-spacing: .13em; }
.eyebrow span { margin: 0 7px; }
.book-intro h1 { margin: 25px 0 0; font: 400 clamp(52px, 6.3vw, 104px)/.99 'Bodoni Moda', Georgia, serif; letter-spacing: -.065em; text-wrap: balance; }
.book-subtitle { margin: 22px 0 0; font: 400 13px/1.5 'DM Mono', monospace; color: #666; }
.book-description { margin-top: clamp(32px, 4vw, 60px); max-width: 480px; }
.book-description p { margin: 0 0 16px; font: 400 clamp(16px, 1.3vw, 19px)/1.7 'Fraunces', Georgia, serif; color: #393939; }
.book-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 22px; margin-top: 32px; }
.book-actions a { text-decoration: none; font: 500 11px/1.5 'DM Mono', monospace; }
.read-link { padding: 15px 19px; background: #161616; color: white; }
.read-link:hover { background: #444; }
.download-link { color: #171717; border-bottom: 1px solid #999; padding-bottom: 5px; }
.book-actions span { margin-left: 10px; }
.contents { margin-top: clamp(100px, 12vw, 180px); border-top: 1px solid #171717; }
.contents-heading { display: flex; justify-content: space-between; align-items: baseline; gap: 20px; padding: 30px 0 38px; }
.contents-heading h2 { margin: 0; font: 400 clamp(48px, 6vw, 85px)/1 'Bodoni Moda', Georgia, serif; letter-spacing: -.055em; }
.chapter-list { list-style: none; margin: 0; padding: 0; }
.chapter-list li { display: grid; grid-template-columns: 65px minmax(0, 1fr); align-items: baseline; gap: 16px; padding: 20px 0; border-top: 1px solid #dedede; }
.chapter-number { color: #999; font: 400 11px/1.5 'DM Mono', monospace; }
.chapter-list a { display: flex; justify-content: space-between; gap: 16px; color: #222; text-decoration: none; font: 400 clamp(19px, 2.1vw, 30px)/1.25 'Fraunces', Georgia, serif; }
.chapter-list a:hover { color: #777; }
.chapter-list a span { font: 400 15px/1.5 'DM Mono', monospace; }
.chapter-list .is-section { padding-top: 35px; }
.chapter-list .is-section a { font-size: clamp(26px, 3vw, 43px); }
.back-home { display: inline-block; margin-top: 75px; font: 400 12px/1.5 'DM Mono', monospace; }
.missing { padding: 90px 0; }
@media (max-width: 720px) {
  .book-page { padding-bottom: 75px; }
  .book-hero { grid-template-columns: 1fr; gap: 38px; }
  .book-cover { max-width: 440px; }
  .book-intro h1 { font-size: clamp(50px, 12vw, 78px); }
  .contents { margin-top: 90px; }
  .chapter-list li { grid-template-columns: 35px minmax(0, 1fr); gap: 10px; }
  .contents-heading { padding-bottom: 28px; }
}
</style>
