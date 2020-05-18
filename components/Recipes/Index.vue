<template>
  <List :list="recipes" @create="toogleModal" @remove="remove" @update="update" />
  <Modal
    :recipe="modalRecipe"
    v-if="isModalOpen"
    @close="toogleModal"
    :ingredients="ingredients"
    @save="save"
  />
</template>

<script>
import { ref, computed } from "vue";
import { useRecipes, useIngredients } from "../../store";
import List from "../UI/List.vue";
import Modal from "./Modal.vue";
export default {
  components: { List, Modal },
  setup() {
    const isModalOpen = ref(false);
    const toogleModal = () => (isModalOpen.value = !isModalOpen.value);

    const modalRecipe = ref(false);

    const recipesStore = useRecipes();
    const recipes = computed(() => recipesStore.recipes.value);
    const ingredients = computed(() => useIngredients().ingredients.value);

    const save = ({ recipe }) => {
      if (recipe.id) {
        recipesStore.update(recipe);
      } else {
        recipesStore.create(recipe);
      }
      toogleModal();
    };

    const update = ({ item }) => {
      modalRecipe.value = item;
      toogleModal();
    };

    const remove = ({ item }) => {
      recipesStore.remove(item);
    };

    return {
      recipes,
      ingredients,
      isModalOpen,
      toogleModal,
      modalRecipe,
      save,
      remove,
      update
    };
  }
};
</script>

<style>
</style>