
import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import BookIndex from "../pages/BookIndex.vue";
import ChapterPage from "../pages/ChapterPage.vue";
import NotFound from "../pages/NotFound.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/llibres/:bookSlug", name: "book", component: BookIndex },
    { path: "/llibres/:bookSlug/:chapterSlug", name: "chapter", component: ChapterPage },
    { path: "/:pathMatch(.*)*", name: "notfound", component: NotFound },
  ],
  scrollBehavior: () => ({ top: 0 }),
});