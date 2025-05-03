import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Dashboard from "../components/Dashboard.vue";
import Sampah from "../components/Sampah.vue";
import Nasabah from "../components/Nasabah.vue";
import JadwalPenimbangan from "../components/JadwalPenimbangan.vue";
import Penimbangan from "../components/Penimbangan.vue";

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            title: "Login",
            bodyClass: "bg-gradient-primary",
        },
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: {
            title: "Dashboard",
        },
        children: [
            {
                path: "sampah",
                component: Sampah,
                meta: {
                    title: "Sampah",
                },
            },
            {
                path: "nasabah",
                component: Nasabah,
                meta: {
                    title: "Nasabah",
                },
            },
            {
                path: "jadwalPenimbangan",
                component: JadwalPenimbangan,
                meta: {
                    title: "Jadwal Penimbangan",
                },
            },
            {
                path: "penimbangan",
                component: Penimbangan,
                meta: {
                    title: "Penimbangan",
                },
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Mengubah title halaman berdasarkan meta title
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    } else {
        document.title = "BANK SAMPAH"; // Set default title
    }

    if (to.meta.bodyClass) {
        document.body.classList.add(to.meta.bodyClass);
    } else {
        document.body.classList.add("default-bg"); // Default class if no specific class in the meta
    }
    next();
});

// router.beforeEach((to, from, next) => {
//     const token = localStorage.getItem("token");
//     if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
//         next({ name: "login" });
//     } else {
//         next();
//     }
// });

export default router;
