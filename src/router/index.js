import * as VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Edit from "../views/Edit.vue";
import Preview from "../views/Preview.vue";

export default VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: "main",
            component: Main
        },
        {
            path: "/edit",
            name: "edit",
            component: Edit
        },
        {
            path: "/preview",
            name: "preview",
            component: Preview
        },
        {
            path: '/:pathMatch(.*)',
            redirect: '/'
        }
    ]
})