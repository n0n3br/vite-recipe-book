<template>
  <div class="hero is-fullheight-with-navbar is-primary">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">Welcome to ViteRecipeBook</h1>
        <p class="subtitle">
          You have {{ data.recipes.length }} recipes and
          {{ data.ingredients.length }} ingredients stored
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "../store";
export default {
  setup() {
    const store = useStore();
    const data = reactive({
      ingredients: store.ingredients,
      recipes: store.recipes
    });
    return { data };
  }
};
</script>

<style></style>
