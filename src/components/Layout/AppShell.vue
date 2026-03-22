<template>
  <div class="min-h-screen bg-white text-black font-sans flex flex-col">
    <!-- HEADER: només apareix a Home quan fas scroll -->
    <header v-if="showHeader" class="sticky top-0 z-50 bg-white shadow-sm backdrop-blur-sm">
      <div class="w-full p-6">
        <RouterLink
          to="/"
          class="flex items-center gap-4 text-black"
        >
          <!-- LOGO -->
          <img
            src="/logo-domar.png"
            alt="Domar la bèstia"
            class="h-[28px] w-auto object-contain"
          />
          <!-- TEXT -->
          <div class="flex items-baseline gap-3">
            <span class="text-2xl font-serif font-bold tracking-[0.18em]">
              Domar la bèstia
            </span>
          </div>
        </RouterLink>
      </div>
      <div class="border-t border-black/5" />
    </header>

    <!-- MAIN -->
    <main class="flex-1 w-full bg-gray-50">
      <slot />
    </main>

    <!-- FOOTER -->
    <footer class="mt-auto bg-white">
      <div class="border-t border-neutral-200" />
        <div class="mx-auto w-full px-6 py-6">
          <p class="text-sm text-center sm:text-left text-neutral-900">
            ©MarcZamora {{ new Date().getFullYear() }}
          </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const scrollY = ref(0);

// Quan apareix el header a la Home (px). Ajusta al gust.
const THRESHOLD = 120;

const isHome = computed(() => route.path === "/");
const showHeader = computed(() => {
  // A Home: només quan fas scroll
  if (isHome.value) return scrollY.value > THRESHOLD;
  // A la resta: sempre visible
  return true;
});

function onScroll() {
  scrollY.value = window.scrollY || 0;
}

onMounted(() => {
  scrollY.value = window.scrollY || 0;
  window.addEventListener("scroll", onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});

// Si canvies de ruta, recalcula scrollY (i assegura header correcte)
watch(
  () => route.path,
  () => {
    scrollY.value = window.scrollY || 0;
  }
);
</script>
