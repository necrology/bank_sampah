import { createRouter, createWebHistory } from "vue-router";
// import Login from "../components/Login.vue";
import Landing from "../components/Landing.vue";
// import Dashboard from "../components/Dashboard.vue";

const routes = [
    {
        path: "/",
        name: "landing",
        component: Landing,
        meta: {
            title: "Bank Sampah",
        },
    },
    // {
    //     path: "/login",
    //     name: "login",
    //     component: Login,
    //     meta: {
    //         title: "Login",
    //         bodyClass: "bg-gradient-primary",
    //     },
    // },
    // {
    //     path: "/dashboard",
    //     name: "dashboard",
    //     component: Dashboard,
    //     meta: {
    //         title: "Dashboard",
    //     },
    // },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Mengubah title halaman berdasarkan meta title
// router.beforeEach((to, from, next) => {
//     if (to.meta.title) {
//         document.title = to.meta.title;
//     } else {
//         document.title = "BANK SAMPAH"; // Set default title
//     }

//     if (to.meta.bodyClass) {
//         document.body.classList.add(to.meta.bodyClass);
//     } else {
//         document.body.classList.add("default-bg"); // Default class if no specific class in the meta
//     }
//     next();
// });

// router.beforeEach((to, from, next) => {
//     const token = localStorage.getItem("token");
//     if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
//         next({ name: "login" });
//     } else {
//         next();
//     }
// });

export default router;
