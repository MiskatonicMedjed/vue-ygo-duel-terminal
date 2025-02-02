import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import InventoryView from "@/views/InventoryView.vue";
import TrunkView from "@/views/TrunkView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/inventory",
    name: "inventory",
    component: InventoryView,
  },
  {
    path: "/card-field",
    name: "card-field",
    component: TrunkView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes,
});

export default router;
