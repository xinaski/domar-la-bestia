<template>
  <main class="soon-page">
    <nav class="breadcrumb"><RouterLink to="/">Inici</RouterLink><span>/</span><span>El cansament de ser</span></nav>
    <section class="soon-hero">
      <img class="soon-image" src="/images/paperera-fotografia.webp" alt="Una paperera amb un únic full de paper arrugat" />
      <div class="soon-copy">
        <p class="eyebrow">DOMAR LA BÈSTIA — LLIBRE 04</p>
        <h1>El cansament de ser</h1>
        <p class="joke">Després de mesos de feina, això és tot el que hem pogut salvar.</p>
        <p class="aside">Pròximament. O això em dic.</p>
        <RouterLink class="back" to="/">← Tornar als llibres</RouterLink>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
<style scoped>
.soon-page{width:min(100% - 48px,1250px);margin:auto;padding:clamp(32px,4vw,65px) 0 130px;color:#171717}
.breadcrumb{display:flex;gap:12px;color:#777;font:11px/1.5 'DM Mono',monospace}
.breadcrumb a{color:inherit;text-decoration:none}
.soon-hero{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1fr);gap:clamp(45px,8vw,140px);align-items:center;margin-top:clamp(42px,6vw,90px)}
.soon-image{display:block;width:100%;aspect-ratio:4/5;object-fit:cover;filter:grayscale(1)}
.eyebrow{font:500 11px/1.5 'DM Mono',monospace;letter-spacing:.13em}
h1{margin:25px 0 0;font:400 clamp(52px,6.3vw,104px)/.99 'Bodoni Moda',Georgia,serif;letter-spacing:-.065em;text-wrap:balance}
.joke{margin:clamp(36px,4vw,65px) 0 0;max-width:460px;font:400 clamp(18px,1.6vw,23px)/1.6 'Fraunces',Georgia,serif}
.aside{margin:20px 0 0;color:#777;font:13px/1.7 'DM Mono',monospace}
.back{display:inline-block;margin-top:43px;padding:16px 22px;background:#171717;color:white;text-decoration:none;font:500 11px/1.5 'DM Mono',monospace}
.back:hover{background:#444}
@media(max-width:720px){.soon-hero{grid-template-columns:1fr;gap:38px}.soon-image{max-width:440px}h1{font-size:clamp(50px,12vw,78px)}.joke{margin-top:35px}}
</style>