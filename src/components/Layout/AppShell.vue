<template>
  <div class="site-shell">
    <header class="site-header">
      <RouterLink to="/" class="site-brand">Domar la bèstia</RouterLink>
      <a class="site-external" href="https://soroll.xinaski.com/" target="_blank" rel="noopener noreferrer">Soroll de fons <span aria-hidden="true">→</span></a>
    </header>
    <main class="site-main"><slot /></main>
    <footer class="site-footer"><span>© Marc Zamora {{ new Date().getFullYear() }}</span><RouterLink to="/">Domar la bèstia</RouterLink></footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped>
.site-shell { display: flex; flex-direction: column; min-height: 100vh; background: #fff; color: #111; }
.site-header { display: flex; align-items: center; justify-content: space-between; gap: 24px; width: 100%; padding: 18px clamp(22px, 2.7vw, 48px); }
.site-brand { color: inherit; text-decoration: none; font: 700 clamp(22px, 2.1vw, 32px)/1.05 Georgia, serif; letter-spacing: -.045em; }
.site-external { color: inherit; text-decoration: none; text-transform: uppercase; font: 600 10px/1.5 'DM Mono', monospace; letter-spacing: .25em; white-space: nowrap; }
.site-external span { margin-left: 4px; }
.site-external:hover, .site-brand:hover { opacity: .65; }
.site-main { width: 100%; flex: 1; }
.site-footer { display: flex; justify-content: space-between; gap: 16px; padding: 24px clamp(22px, 2.7vw, 48px); border-top: 1px solid #eee; font-size: 12px; }
.site-footer a { color: inherit; text-decoration: none; }
@media (max-width: 600px) {
  .site-header { padding-top: 22px; align-items: flex-start; }
  .site-brand { font-size: 22px; }
  .site-external { max-width: 110px; white-space: normal; text-align: right; font-size: 9px; }
}
</style>
