<template>
  <List :list="data.ingredients" @create="toogleModal" @update="toogleModal" @remove="remove" />
  <Modal
    @save="save"
    :ingredient="data.selectedIngredient"
    @close="toogleModal"
    v-if="data.isModalOpen"
  />
</template>

<script>
import { reactive, computed } from "vue";
import List from "../UI/List.vue";
import Modal from "./Modal.vue";
import { useStore } from "../../store";
export default {
  components: { List, Modal },
  setup() {
    const store = useStore();

    const data = reactive({
      isModalOpen: false,
      selectedIngredient: {},
      ingredients: store.ingredients,
      recipes: store.recipes
    });

    const toogleModal = (params = {}) => {
      data.selectedIngredient = params.item || false;
      data.isModalOpen = !data.isModalOpen;
    };

    const save = ({ ingredient }) => {
      if (ingredient.id) {
        store.updateIngredient(ingredient);
      } else {
        store.createIngredient(ingredient);
      }
      toogleModal();
    };

    const remove = ({ item }) => {
      if (
        data.recipes.some(findRecipe =>
          findRecipe.ingredients.some(
            someIngredient => someIngredient.id === item.id
          )
        )
      ) {
        alert("Ingredient can not be removed. It's used in some recipes");
        return;
      }
      store.removeIngredient(item);
    };

    return {
      save,
      remove,
      data,
      toogleModal
    };
  }
};
</script>
<style>
</style>