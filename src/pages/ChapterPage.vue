<template>
  <div class="mx-auto py-16 px-4 sm:px-8 bg-white border-x max-w-[800px]">
    <section v-if="book && chapter">
      <RouterLink :to="`/llibres/${book.slug}`" class="text-md underline underline-offset-4">← Índex</RouterLink>
        <h1 class="mt-6 text-3xl font-serif font-bold">
          {{ chapter.title }}
        </h1>
        <p v-if="chapter.date" class="mt-4 text-sm text-neutral-600">
          {{ chapter.date }}
        </p>
        <Hairline class="mt-6" />

        <div class="mt-6 font-serif text-[18px] leading-relaxed
                    [&>p]:mb-5
                    [&>blockquote]:border-l [&>blockquote]:border-neutral-200 [&>blockquote]:pl-4 [&>blockquote]:text-neutral-700
                    [&>ul]:my-5 [&>ol]:my-5 [&>li]:mb-2
                    [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:mt-8 [&>h3]:mb-3"
                    v-html="chapter.html" />
          <div class="flex justify-between text-md pt-10">
          <RouterLink v-if="nav.prev" :to="`/llibres/${book.slug}/${nav.prev}`" class="underline underline-offset-4">← anterior</RouterLink>
            <span v-else />
          <RouterLink v-if="nav.next" :to="`/llibres/${book.slug}/${nav.next}`" class="underline underline-offset-4">següent →</RouterLink>
          <span v-else />
      </div>
    </section>
    <section v-else>
      <p class="text-md">No trobo aquest capítol.</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { booksBySlug } from "../content.gen";
import Hairline from "../components/UI/Hairline.vue";

const route = useRoute();
const bookSlug = computed(() => String(route.params.bookSlug || ""));
const chapterSlug = computed(() => String(route.params.chapterSlug || ""));

const book = computed(() => booksBySlug[bookSlug.value]);
const chapter = computed(() => book.value?.chapters.find((c) => c.slug === chapterSlug.value));
const nav = computed(() => (book.value ? book.value.nav[chapterSlug.value] : { prev: null, next: null }));
</script>
