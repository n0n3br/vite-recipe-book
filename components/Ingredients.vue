<template>
  <div class="container has-margin-top-20">
    <div class="columns">
      <div class="column">
        <input type="text" class="input" v-model="searchInput" />
      </div>
      <div class="column is-narrow">
        <button class="button is-primary" @click="toogleModal">Add</button>
      </div>
    </div>
    <div class="columns">
      <template v-if="!ingredients.length">
        <div class="column has-text-centered has-margin-top-40">
          <h1 class="title">You have no ingredients</h1>
          <h2 class="subtitle">Start adding them by clicking the Add button</h2>
        </div>
      </template>
      <template v-else>
        <div class="column is-3" v-for="ingredient in filteredIngredients" :key="ingredient.id">
          <Ingredient
            :ingredient="ingredient"
            :canRemove="canRemoveIngredient(ingredient)"
            :update="updateIngredient"
            :remove="removeIngredient"
          />
        </div>
      </template>
    </div>
    <ModalIngredients v-if="isModalOpen" @close="toogleModal" :ingredient="modalIngredient" />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useIngredients, useRecipes } from "../store";
import ModalIngredients from "./ModalIngredients.vue";
import Ingredient from "./Ingredient.vue";
export default {
  components: {
    ModalIngredients,
    Ingredient
  },
  setup() {
    const isModalOpen = ref(false);
    const modalIngredient = ref({});

    const searchInput = ref("");
    const filteredIngredients = computed(() =>
      !searchInput.value
        ? ingredients.value
        : ingredients.value.filter(
            ingredient =>
              ingredient.title.includes(searchInput.value) ||
              ingredient.description.includes(searchInput.value)
          )
    );

    const ingredientsStore = useIngredients();
    const ingredients = ingredientsStore.ingredients;

    const { recipes } = useRecipes();

    const canRemoveIngredient = ingredient =>
      !recipes.value.some(someRecipe =>
        someRecipe.ingredients.some(
          someIngredient => someIngredient.id === ingredient.id
        )
      );

    const removeIngredient = ingredient => {
      if (!canRemoveIngredient(ingredient)) return;
      ingredientsStore.remove(ingredient);
    };

    const updateIngredient = ingredient => {
      modalIngredient.value = ingredient;
      toogleModal();
    };

    const toogleModal = () => {
      isModalOpen.value = !isModalOpen.value;
    };

    return {
      isModalOpen,
      toogleModal,
      filteredIngredients,
      ingredients,
      canRemoveIngredient,
      removeIngredient,
      updateIngredient,
      modalIngredient,
      searchInput
    };
  }
};
</script>

<style></style>
