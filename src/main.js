import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueDraggable from "vue-draggable";

createApp(App).use(store).use(router).use(VueDraggable).mount("#app");
