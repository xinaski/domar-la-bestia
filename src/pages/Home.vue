<template>
  <section class="w-full bg-gray-50 border-b text-black">
    <div
      class="mx-auto max-w-[1500px] px-6 pt-8 pb-14 md:px-10 md:pt-40 md:pb-20 bg-no-repeat bg-right bg-contain"
      :style="heroBg"
    >
      <div class="max-w-[980px] transition-all duration-700 ease-out"
            :class="ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'" >
        <h1 class="font-serif font-bold leading-[0.82] tracking-[-0.05em] text-[clamp(80px,15vw,260px)] md:text-[clamp(150px,17vw,370px)]" >
          Domar
          <span class="hidden md:inline"><br /></span>
          la bèstia
        </h1>

        <p class="mt-16 max-w-[620px] font-serif leading-[1.2] tracking-[-0.02em] text-[clamp(24px,2vw,42px)]" >
          Relats sobre memòria, errors, nits llargues i aquella tossuda mania de continuar viu.
        </p>
      </div>
    </div>
  </section>

  <section class="w-full bg-white text-black">
    <div class="mx-auto max-w-[1500px] px-6 py-16 md:px-10 md:py-24">

      <!-- LLIBRES -->
      <div class="transition-all duration-700 ease-out delay-200"
            :class="ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'" >
        <p class="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-black/45">
          Llibres
        </p>
        <p class="mb-12 text-xs italic font-medium tracking-[0.18em] text-black/80">
          Varies maneres diferents d’ordenar el caos.
        </p>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-16">
          <RouterLink
  v-for="b in books"
  :key="b.slug"
  :to="`/llibres/${b.slug}`"
  class="group block border-l-2 border-black px-6 md:px-7 transition-all duration-200 hover:-translate-y-[2px] hover:border-black/30"
>
  <div class="flex min-h-[220px] gap-5 md:gap-6 items-start">
    
    <!-- COVER -->
    <div class="w-[110px] h-[110px] md:w-[132px] md:h-[132px] shrink-0 overflow-hidden bg-black/5">
      <img
        v-if="b.cover"
        :src="b.cover"
        :alt="b.title"
        class="w-full h-full object-cover transition duration-300 group-hover:scale-[1.03]"
      />
    </div>

    <!-- TEXT -->
    <div class="flex min-h-[180px] flex-1 flex-col justify-between">
      <div>
        <h3 class="font-serif text-[clamp(24px,2vw,30px)] leading-[0.95] tracking-[-0.02em]">
          {{ b.title }}
        </h3>

        <p class="mt-4 text-[16px] leading-[1.45] text-black/70">
          {{ bookDescriptions[b.slug] || "Descripció pendent." }}
        </p>
      </div>

      <div class="mt-8">
        <span
          class="font-serif text-[18px] underline decoration-transparent underline-offset-[8px] transition-[text-decoration-color] duration-200 group-hover:decoration-black"
        >
          Entrar al llibre
        </span>
      </div>
    </div>
  </div>
</RouterLink>

        </div>
      </div>

      <!-- FRAGMENTS -->
      <div
        class="mt-14 border-t border-black/10 pt-8 md:mt-20 md:pt-10 transition-all duration-700 ease-out delay-300"
        :class="ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'"
      >
        <div class="w-full">
          <p class="text-xs font-medium uppercase tracking-[0.18em] text-black/45">
            Fragments
          </p>

          <p
            class="mt-4 font-serif text-[clamp(22px,2.4vw,36px)] leading-[1.25] tracking-[-0.02em] text-black/85"
          >
            La vida no s’entén, s’aguanta. 
            <br>
            Algunes nits et construeixen més que anys sencers. 
            <br>
            La lucidesa acostuma a arribar tard, quan ja has fet prou merda. 
            <br>
            Ser intens no és el mateix que ser profund. 
            <br>
            I el caos, moltes vegades, només és una manera elegant de fugir.
          </p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { books } from "../content.gen";

const ready = ref(false);

onMounted(() => {
  requestAnimationFrame(() => {
    ready.value = true;
  });
});

const heroBg = computed(() => ({
  backgroundImage: "url('/imgabout01.png')",
  backgroundPosition: "right center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "min(34vw, 360px)",
}));

const bookDescriptions: Record<string, string> = {
  "caure-lentament":
    "Relats d’una etapa caòtica, escrita sense filtres i revisitada amb els anys. Nits llargues, excés i supervivència.",

  "dignitat-marxar-tard":
    "Textos sobre memòria, absència i la manera estranya que té la vida d’arribar sempre una mica tard.",

  "instruccions-enfadat":
    "Fragments, observacions i petites formes de ràbia quotidiana mirades amb ironia, cansament i mala llet ben administrada.",

  "cansament-de-ser":
    "Pròximament"
};

</script>
