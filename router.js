import { defineAsyncComponent } from "vue";
import { createWebHistory, createRouter } from "vue-router";

const history = createWebHistory();

const routes = [
    {
        path: "/",
        component: defineAsyncComponent(() => import("./components/Home.vue")),
    },
    {
        path: "/ingredients",
        component: defineAsyncComponent(() =>
            import("./components/Ingredients.vue")
        ),
    },
    {
        path: "/recipes",
        component: defineAsyncComponent(() =>
            import("./components/Recipes.vue")
        ),
    },
];

export default createRouter({ routes, history });
