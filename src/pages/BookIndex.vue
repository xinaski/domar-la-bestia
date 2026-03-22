<template>
  <div class="mx-auto max-w-[800px] border-x bg-white px-4 pt-8 pb-16 sm:px-8">
    <section v-if="bookData">
      <!-- HEADER -->
      <header class="mb-10">
        <div class="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
          <!-- IMAGE -->
          <div
            v-if="bookData.cover"
            class="w-[180px] shrink-0 overflow-hidden bg-black/5 sm:w-[220px] md:w-[200px]"
          >
            <img
              :src="bookData.cover"
              :alt="bookData.title"
              class="h-auto w-full object-cover"
            />
          </div>

          <!-- TITLE + DESCRIPTION -->
          <div class="flex-1">
            <h1 class="font-serif text-2xl font-semibold leading-[0.95] tracking-[-0.02em] sm:text-3xl">
              {{ bookData.title }}
            </h1>

            <div v-if="bookData.description" class="mt-6 max-w-2xl">
              <p
                v-for="(p, i) in bookData.description"
                :key="i"
                class="text-sm leading-[1.6] text-neutral-700 mb-4"
              >
                {{ p }}
              </p>
            </div>
          </div>
        </div>

        <!-- DIVIDER -->
        <div class="mt-8 border-t border-black/10"></div>
      </header>

      <!-- CHAPTERS -->
      <div class="space-y-3">
        <div v-for="ch in chapters" :key="ch.slug">
          <div v-if="ch.type === 'section'" class="pt-6">
            <p class="text-xs uppercase tracking-wide text-neutral-500">
              Capítol
            </p>

            <RouterLink
              :to="`/llibres/${bookData.slug}/${firstChildSlug(ch.slug)}`"
              class="mt-2 block font-serif text-xl font-semibold hover:underline hover:underline-offset-4"
            >
              {{ ch.title }}
            </RouterLink>
          </div>

          <div v-else class="pl-6">
            <RouterLink
              :to="`/llibres/${bookData.slug}/${ch.slug}`"
              class="font-serif text-xl hover:underline hover:underline-offset-4"
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