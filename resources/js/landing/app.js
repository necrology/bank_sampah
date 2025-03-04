import { createApp } from "vue";
import router from "./router";

import App from "./components/Landing.vue";

import "/public/landing/css/styles.css";

createApp(App).use(router).mount("#app1");
