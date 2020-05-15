<template>
  <div class="hero is-fullheight-with-navbar is-primary">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">Welcome to ViteRecipeBook</h1>
        <p class="subtitle">
          You have {{ recipes.length }} recipes and
          {{ ingredients.length }} ingredients stored
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useIngredients, useRecipes } from "../store";
export default {
  setup() {
    const { ingredients } = useIngredients();
    const { recipes } = useRecipes();
    return { ingredients, recipes };
  }
};
</script>

<style></style>
