import { ref, computed, watch } from "vue";

const id = () => "_" + Math.random().toString(36).substr(2, 9);

const ingredients = ref(
    localStorage.getItem("ingredients")
        ? JSON.parse(localStorage.getItem("ingredients"))
        : []
);
watch(ingredients, (value) =>
    localStorage.setItem("ingredients", JSON.stringify(value))
);
export const useIngredients = () => ({
    ingredients: computed(() => ingredients.value),
    add: (ingredient) => {
        ingredients.value = [...ingredients.value, { id: id(), ...ingredient }];
    },
    remove: (ingredient) => {
        ingredients.value = ingredients.value.filter(
            (filterIngredient) => filterIngredient.id !== ingredient.id
        );
    },
    update: (ingredient) => {
        console.log("update", ingredient);
        ingredients.value = ingredients.value.map((mapIngredient) =>
            mapIngredient.id !== ingredient.id ? mapIngredient : ingredient
        );
    },
});

const recipes = ref(
    localStorage.getItem("recipes")
        ? JSON.parse(localStorage.getItem("recipes"))
        : []
);
watch(recipes, (value) =>
    localStorage.setItem("recipes", JSON.stringify(value))
);
export const useRecipes = () => ({
    recipes: computed(() => recipes.value),
    add: (recipe) => {
        recipes.value = [...recipes.value, { id: id(), ...recipe }];
    },
    remove: (id) => {
        recipes.value = recipes.value.filter(
            (filterRecipe) => filterRecipe.id !== id
        );
    },
    update: (recipe) => {
        recipes.value = recipes.value.map((mapRecipe) =>
            mapRecipe.id != recipe.id ? mapRecipe : recipe
        );
    },
});
