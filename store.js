import { reactive, watch, computed } from "vue";

const id = () => "_" + Math.random().toString(36).substr(2, 9);

const storeName = "vite-recipe-book-state";

const state = reactive(
    localStorage.getItem(storeName)
        ? JSON.parse(localStorage.getItem(storeName))
        : {
              ingredients: [],
              recipes: [],
          }
);
watch(state, (value) => localStorage.setItem(storeName, JSON.stringify(value)));
export const useStore = () => ({
    ingredients: computed(() => state.ingredients),
    recipes: computed(() => state.recipes),
    createIngredient: (ingredient) => {
        state.ingredients = [...state.ingredients, { id: id(), ...ingredient }];
    },
    removeIngredient: ({ id }) => {
        state.ingredients = state.ingredients.filter(
            (filterIngredient) => filterIngredient.id !== id
        );
    },
    updateIngredient: (ingredient) => {
        state.ingredients = state.ingredients.map((mapIngredient) =>
            mapIngredient.id !== ingredient.id ? mapIngredient : ingredient
        );
    },
    createRecipe: (recipe) => {
        state.recipes = [...state.recipes, { id: id(), ...recipe }];
    },
    removeRecipe: ({ id }) => {
        state.recipes = [
            ...state.recipes.filter((filterRecipe) => filterRecipe.id !== id),
        ];
    },
    updateRecipe: (recipe) => {
        state.recipes = [
            ...state.recipes.map((mapRecipe) =>
                mapRecipe.id != recipe.id ? mapRecipe : recipe
            ),
        ];
    },
});
