<template>
  <div class="home">
    <section class="hero" aria-labelledby="home-title">
      <div class="section-index"><span>01</span><span class="index-line"></span></div>
      <div class="hero-grid">
        <h1 id="home-title">Coses que no<br class="desktop-break" /> sabia on posar</h1>
        <div class="hero-aside">
          <p>Primer van ser textos solts.<br />Després, capítols. Al final, llibres.<br />La resta continua una mica<br class="desktop-break" /> desendreçada.</p>
          <span class="aside-rule" aria-hidden="true"></span>
          <a href="#llibres" class="micro-link">Explora els llibres <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>

    <section id="llibres" class="books" aria-label="Llibres">
      <div class="book-grid">
        <article v-for="(book, index) in featuredBooks" :key="book.slug" class="book-card" :class="'book-card--' + (index + 1)">
          <span class="book-number">0{{ index + 1 }}</span>
          <RouterLink :to="'/llibres/' + book.slug" class="book-cover-link" :aria-label="'Obrir ' + book.title">
            <img :src="book.image" :alt="book.imageAlt" class="book-cover" :loading="index === 0 ? 'eager' : 'lazy'" />
          </RouterLink>
          <div class="book-copy">
            <h2><RouterLink :to="'/llibres/' + book.slug">{{ book.title }}</RouterLink></h2>
            <p :class="{ 'coming-soon': book.comingSoon }">{{ book.description }}</p>
            <RouterLink v-if="!book.comingSoon" :to="'/llibres/' + book.slug" class="micro-link book-action">Llegir <span aria-hidden="true">→</span></RouterLink>
            <span v-else class="micro-link book-action muted">Pròximament</span>
          </div>
        </article>
      </div>
    </section>

    <section class="closing" aria-label="Una nota final">
      <img src="/images/home/paper-arrugat.webp" alt="Un full de paper blanc arrugat sobre una taula" loading="lazy" />
      <div class="closing-copy">
        <h2>No en teníem ni idea.<br />I aquí seguim.</h2>
        <p>La resta l’anem escrivint sobre la marxa.</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

const featuredBooks = [
  {
    slug: "caure-lentament",
    title: "L’art de caure lentament",
    image: "/images/home/caure-lentament.webp",
    imageAlt: "Copa de vi bolcada, vi vessat i una cigarreta",
    description: "Relats d’una etapa caòtica, escrita sense filtres i revisitada amb els anys. Nits llargues, excés i supervivència.",
  },
  {
    slug: "dignitat-marxar-tard",
    title: "La dignitat de marxar tard",
    image: "/images/home/dignitat-marxar-tard.webp",
    imageAlt: "Despertador vermell amb el vidre trencat",
    description: "Textos sobre la memòria, absència i la manera estranya que té la vida d’arribar sempre una mica tard.",
  },
  {
    slug: "no-hi-ha-per-tant",
    title: "Instruccions per viure lleugerament enfadat",
    image: "/images/home/viure-enfadat.webp",
    imageAlt: "Filferro vermell embolicat en un nus",
    description: "Fragments, observacions i petites formes de ràbia quotidiana, mirades amb ironia i mala llet ben administrada.",
  },
  {
    slug: "cansament-de-ser",
    title: "El cansament de ser",
    image: "/images/home/cansament-de-ser.webp",
    imageAlt: "Un llumí consumit i ennegrit",
    description: "Pròximament",
    comingSoon: true,
  },
];
</script>

<style scoped>
.home { --page-gutter: clamp(22px, 2.7vw, 48px); --ink: #141414; color: var(--ink); background: #fff; }
.hero, .books, .closing { max-width: 1600px; margin-inline: auto; padding-inline: var(--page-gutter); }
.hero { padding-top: clamp(64px, 7vw, 126px); }
.section-index { display: flex; align-items: center; gap: 9px; color: #6b6b6b; font: 11px/1.2 'DM Mono', monospace; }
.index-line { width: 46px; border-top: 1px solid #9d9d9d; }
.hero-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(205px, 23%); align-items: start; column-gap: 5%; margin-top: 18px; }
h1 { max-width: 900px; margin: 0; font-family: 'Bodoni Moda', 'Didot', 'Bodoni MT', Georgia, serif; font-weight: 400; font-size: clamp(60px, 6.45vw, 115px); letter-spacing: -.065em; line-height: .99; }
.hero-aside { padding-top: 20px; }
.hero-aside p { font-size: clamp(14px, 1.15vw, 18px); line-height: 1.17; margin: 0; }
.aside-rule { display: block; width: 36px; border-top: 1px solid currentColor; margin: 30px 0 28px; }
.micro-link { display: inline-flex; align-items: center; gap: 9px; color: inherit; text-decoration: none; font: 600 10px/1.5 'DM Mono', monospace; letter-spacing: .25em; text-transform: uppercase; }
.micro-link:hover, .book-copy h2 a:hover { opacity: .58; }
.books { padding-top: clamp(80px, 8vw, 135px); }
.book-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); column-gap: clamp(24px, 5vw, 85px); align-items: start; }
.book-card--2 { margin-top: 90px; }
.book-card--3 { margin-top: 23px; }
.book-card--4 { margin-top: 60px; }
.book-number { display: block; margin-bottom: 14px; color: #777; font: 11px/1 'DM Mono', monospace; }
.book-cover-link { display: block; width: 100%; overflow: hidden; background: #f5f3f0; aspect-ratio: 1; }
.book-cover { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform .45s ease; }
.book-cover-link:hover .book-cover { transform: scale(1.035); }
.book-copy { padding-top: 14px; }
.book-copy h2 { margin: 0; font-size: clamp(14px, 1.13vw, 17px); font-weight: 600; line-height: 1.24; letter-spacing: -.025em; }
.book-copy h2 a { color: inherit; text-decoration: none; }
.book-copy p { margin: 11px 0 0; max-width: 290px; font-size: clamp(12px, .98vw, 15px); line-height: 1.22; }
.book-copy p.coming-soon { font-style: italic; }
.book-action { margin-top: 20px; }
.book-action.muted { opacity: .5; }
.closing { position: relative; padding-top: clamp(75px, 7vw, 135px); padding-bottom: clamp(85px, 10vw, 170px); }
.closing-copy { position: absolute; inset: clamp(75px, 7vw, 135px) var(--page-gutter) clamp(85px, 10vw, 170px); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px; color: #171717; pointer-events: none; }
.closing-copy h2 { margin: 0; font: 400 clamp(30px, 4.3vw, 72px)/1.05 'Bodoni Moda', Georgia, serif; letter-spacing: -.055em; text-wrap: balance; }
.closing-copy p { margin: 22px 0 0; font: 400 clamp(11px, 1.05vw, 15px)/1.5 'DM Mono', monospace; letter-spacing: .015em; }
.closing img { display: block; width: 100%; aspect-ratio: 2.52 / 1; object-fit: cover; object-position: center; }
@media (min-width: 1600px) { .hero { padding-top: 125px; } }
@media (max-width: 1020px) {
  .hero-grid { grid-template-columns: minmax(0, 1fr) minmax(180px, 29%); gap: 3%; }
  h1 { font-size: clamp(55px, 7vw, 84px); }
  .book-grid { column-gap: 24px; }
  .book-card--2 { margin-top: 65px; } .book-card--3 { margin-top: 15px; } .book-card--4 { margin-top: 45px; }
}
@media (max-width: 720px) {
  .hero { padding-top: 68px; }
  .hero-grid { display: block; margin-top: 20px; }
  h1 { font-size: clamp(51px, 11.2vw, 85px); max-width: 650px; }
  .desktop-break { display: none; }
  .hero-aside { padding-top: 34px; max-width: 340px; }
  .hero-aside p { font-size: 15px; line-height: 1.35; }
  .aside-rule { margin: 24px 0; }
  .books { padding-top: 85px; }
  .book-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 20px; row-gap: 46px; }
  .book-card--2 { margin-top: 48px; } .book-card--3 { margin-top: 0; } .book-card--4 { margin-top: 48px; }
  .book-copy h2 { font-size: 15px; }
  .book-copy p { font-size: 13px; line-height: 1.35; }
  .closing { padding-top: 90px; padding-bottom: 100px; }
  .closing img { aspect-ratio: 1.6; }
  .closing-copy { inset: 90px var(--page-gutter) 100px; padding: 18px; }
  .closing-copy h2 { font-size: clamp(29px, 7vw, 48px); }
  .closing-copy p { margin-top: 14px; font-size: 10px; }
}
@media (max-width: 390px) {
  h1 { font-size: 47px; }
  .book-grid { column-gap: 14px; }
  .book-copy h2 { font-size: 14px; }
  .book-copy p { font-size: 12px; }
  .micro-link { font-size: 9px; }
}
@media (prefers-reduced-motion: reduce) { .book-cover { transition: none; } }
</style>
