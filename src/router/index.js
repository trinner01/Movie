import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import MoviePage from "../components/MoviePage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/movie/:id",
    name: "Movie",
    component: MoviePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
