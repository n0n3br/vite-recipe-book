import { createWebHistory, createRouter } from "vue-router";
import { defineAsyncComponent } from "vue";

const Home = defineAsyncComponent(() => import("./components/Home.vue"));
const Ingredients = defineAsyncComponent(() =>
    import("./components/Ingredients/Index.vue")
);
const Recipes = defineAsyncComponent(() =>
    import("./components/Recipes/Index.vue")
);
const history = createWebHistory();

const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/ingredients",
        component: Ingredients,
    },
    {
        path: "/recipes",
        component: Recipes,
    },
];

export default createRouter({ routes, history });
