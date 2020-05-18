<template>
  <List :list="ingredients" @create="toogleModal" @update="toogleModal" @remove="remove" />
  <Modal @save="save" :ingredient="selectedIngredient" @close="toogleModal" v-if="isModalOpen" />
</template>

<script>
import { ref } from "vue";
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
    const { ingredients } = ingredientsStore;

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