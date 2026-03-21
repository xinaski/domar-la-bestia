
<template>    
  <div class="mx-auto py-16 px-4 sm:px-8 bg-white border-x max-w-[800px]">
    <section v-if="bookData">
      <h1 class="text-4xl font-serif font-bold">
        {{ bookData.title }}
      </h1>
      <div class="mt-8 space-y-3">
        <div v-for="ch in chapters" :key="ch.slug">
          <div v-if="ch.type === 'section'" class="pt-6">
              <p class="text-xs text-neutral-500 tracking-wide uppercase">Capítol</p>
              <RouterLink
              :to="`/llibres/${bookData.slug}/${firstChildSlug(ch.slug)}`"
              class="mt-2 block text-xl font-medium font-serif font-semibold hover:underline hover:underline-offset-4"
              >
              {{ ch.title }}
              </RouterLink>
          </div>
          <div v-else class="pl-6">
              <RouterLink
              :to="`/llibres/${bookData.slug}/${ch.slug}`"
              class="text-xl font-medium font-serif hover:underline hover:underline-offset-4"
              >
              - {{ ch.title }}
              </RouterLink>
          </div>
        </div>
      </div>
    </section>
    <section v-else>
      <p class="text-sm">No trobo aquest llibre.</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { booksBySlug } from "../content.gen";

const route = useRoute();

const bookSlug = computed(() => {
  const p = route.params.bookSlug;
  return Array.isArray(p) ? p[0] : String(p || "");
});

const bookData = computed(() => booksBySlug[bookSlug.value]);
const chapters = computed(() => bookData.value?.chapters ?? []);

function firstChildSlug(sectionSlug: string) {
  const list = chapters.value;
  if (!list.length) return sectionSlug;

  const idx = list.findIndex((c) => c.slug === sectionSlug);
  if (idx === -1) return sectionSlug;

  for (let i = idx + 1; i < list.length; i++) {
    if (list[i]?.type !== "section") return list[i].slug;
  }

  return sectionSlug;
}
</script>