<template>
  <div class="site-shell">
    <header class="site-header">
      <RouterLink to="/" class="site-brand">Domar la bèstia</RouterLink>
      <a class="site-external" href="https://soroll.xinaski.com/" target="_blank" rel="noopener noreferrer"><svg class="headphones-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 14v-3a9 9 0 0 1 18 0v3"/><rect x="3" y="13" width="4" height="8" rx="2"/><rect x="17" y="13" width="4" height="8" rx="2"/></svg><span>Soroll de fons <span aria-hidden="true">→</span></span></a>
    </header>
    <main class="site-main"><slot /></main>
    <footer class="site-footer"><a class="footer-studio" href="https://diumenge.cat/" target="_blank" rel="noopener noreferrer" aria-label="DIUMENGE — estudi de disseny"><img src="/images/diumenge-logo.svg" alt="DIUMENGE" /></a><RouterLink to="/">Domar la bèstia</RouterLink></footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped>
.site-shell { display: flex; flex-direction: column; min-height: 100vh; background: #fff; color: #111; }
.site-header { position: sticky; top: 0; z-index: 50; background: #fff; border-bottom: 1px solid rgba(17,17,17,.06); display: flex; align-items: center; justify-content: space-between; gap: 24px; width: 100%; padding: 18px clamp(22px, 2.7vw, 48px); }
.site-brand { color: inherit; text-decoration: none; font-family: 'Fraunces', Georgia, serif; font-weight: 400; font-size: clamp(21px, 1.9vw, 29px); line-height: 1.05; letter-spacing: -.045em; }
.site-external { display: inline-flex; align-items: center; gap: 9px; color: inherit; text-decoration: none; text-transform: uppercase; font: 600 10px/1.5 'DM Mono', monospace; letter-spacing: .25em; white-space: nowrap; }
.site-external > span > span { margin-left: 4px; }
.headphones-icon { width: 17px; height: 17px; flex: none; }
.site-external:hover, .site-brand:hover { opacity: .65; }
.site-main { width: 100%; flex: 1; }
.site-footer { display: flex; justify-content: space-between; gap: 16px; padding: 24px clamp(22px, 2.7vw, 48px); border-top: 1px solid #eee; font-size: 12px; }
.site-footer a { color: inherit; text-decoration: none; }
.footer-studio { display: inline-flex; align-items: center; }
.footer-studio img { display: block; width: 112px; height: auto; }
.footer-studio:hover { opacity: .7; }
@media (max-width: 600px) {
  .site-header { padding-top: 22px; align-items: flex-start; }
  .site-brand { font-size: 22px; }
  .site-external { max-width: 110px; white-space: normal; text-align: right; font-size: 9px; }
}
</style>
