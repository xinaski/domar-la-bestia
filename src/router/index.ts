
import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import BookIndex from "../pages/BookIndex.vue";
import ChapterPage from "../pages/ChapterPage.vue";
import NotFound from "../pages/NotFound.vue";
import ComingSoon from "../pages/ComingSoon.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/llibres/no-hi-ha-per-tant", redirect: "/llibres/instruccions-per-viure-lleugerament-enfadat" },
    { path: "/llibres/no-hi-ha-per-tant/:chapterSlug", redirect: to => `/llibres/instruccions-per-viure-lleugerament-enfadat/${to.params.chapterSlug}` },
    { path: "/llibres/cansament-de-ser", name: "coming-soon", component: ComingSoon },
    { path: "/llibres/:bookSlug", name: "book", component: BookIndex },
    { path: "/llibres/:bookSlug/:chapterSlug", name: "chapter", component: ChapterPage },
    { path: "/:pathMatch(.*)*", name: "notfound", component: NotFound },
  ],
  scrollBehavior: () => ({ top: 0 }),
});