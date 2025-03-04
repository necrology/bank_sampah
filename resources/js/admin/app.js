import { createApp } from "vue";
import router from "./router";

import App from "./components/App.vue";
import "/public/sbadmin2/css/sb-admin-2.min.css";
import "/public/sbadmin2/vendor/fontawesome-free/css/all.min.css";
import "/public/sbadmin2/vendor/jquery/jquery.min.js";
import "/public/sbadmin2/vendor/bootstrap/js/bootstrap.bundle.min.js";
// import "/public/sbadmin2/vendor/jquery-easing/jquery.easing.min.js";
// import "/public/sbadmin2/js/sb-admin-2.min.js";
// import "/public/sbadmin2/vendor/chart.js/Chart.min.js";
// import "/public/sbadmin2/js/demo/chart-area-demo.js"
// import "/public/sbadmin2/js/demo/chart-pie-demo.js"
// import Select2 from 'vue3-select2-component';


createApp(App).use(router).mount("#app2");
