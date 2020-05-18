<template>
  <List :list="ingredients" @create="toogleModal" @update="toogleModal" @remove="remove" />
  <Modal @save="save" :ingredient="selectedIngredient" @close="toogleModal" v-if="isModalOpen" />
</template>

<script>
import { ref, computed } from "vue";
import List from "../UI/List.vue";
import Modal from "./Modal.vue";
import { useIngredients, useRecipes } from "../../store";
export default {
  components: { List, Modal },
  setup() {
    const isModalOpen = ref(false);
    const toogleModal = (params = {}) => {
      selectedIngredient.value = params.item || false;
      isModalOpen.value = !isModalOpen.value;
    };

    const selectedIngredient = ref({});

    const ingredientsStore = useIngredients();
    const ingredients = computed(() => ingredientsStore.ingredients.value);

    const recipesStore = useRecipes();

    const save = ({ ingredient }) => {
      if (ingredient.id) {
        ingredientsStore.update(ingredient);
      } else {
        ingredientsStore.create(ingredient);
      }
      toogleModal();
    };

    const remove = ({ item }) => {
      if (
        recipesStore.recipes.value.some(findRecipe =>
          findRecipe.ingredients.some(
            someIngredient => someIngredient.id === item.id
          )
        )
      ) {
        alert("Ingredient can not be removed. It's used in some recipes");
        return;
      }
      ingredientsStore.remove(item);
    };

    return {
      ingredients,
      save,
      remove,
      selectedIngredient,
      toogleModal,
      isModalOpen
    };
  }
};
</script>
<style>
</style>