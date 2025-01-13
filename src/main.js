import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css"; // Подключаем стили, если нужно
createApp(header).mount('#header')
const app = createApp(App);
app.use(router);
app.mount("#app");
createApp(footer).mount('#footer')