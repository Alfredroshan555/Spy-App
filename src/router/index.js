import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Profile from "../views/Profile.vue";
import Services from "../views/Services.vue"

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            title: 'Home',
        },
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
            title: "Register",

        },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            title: 'Login',
        },
    },
    {
        path: "/forgotpassword",
        name: "ForgotPassword",
        component: ForgotPassword,
        meta: {
            title: 'ForgotPassword',
        },
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile,
        meta: {
            title: 'Profile',
        },
    },
    {
        path: "/services",
        name: "Services",
        component: Services,
        meta: {
            title: 'Services',
        },
    },

]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | Spy App`;
    next();
});



export default router;