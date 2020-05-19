<template>
  <List :list="data.recipes" @create="toogleModal" @remove="remove" @update="update" />
  <Modal
    :recipe="data.modalRecipe"
    v-if="data.isModalOpen"
    @close="toogleModal"
    :ingredients="data.ingredients"
    @save="save"
  />
</template>

<script>
import { reactive, computed } from "vue";
import { useStore } from "../../store";
import List from "../UI/List.vue";
import Modal from "./Modal.vue";
export default {
  components: { List, Modal },
  setup() {
    const store = useStore();

    const data = reactive({
      isModalOpen: false,
      modalRecipe: false,
      recipes: store.recipes,
      ingredients: store.ingredients
    });

    const toogleModal = () => {
      data.isModalOpen = !data.isModalOpen;
    };

    const save = ({ recipe }) => {
      if (recipe.id) {
        store.updateRecipe(recipe);
      } else {
        store.createRecipe(recipe);
      }
      toogleModal();
    };

    const update = ({ item }) => {
      data.modalRecipe = item;
      toogleModal();
    };

    const remove = ({ item }) => {
      store.removeRecipe(item);
    };

    return {
      toogleModal,
      data,
      save,
      remove,
      update
    };
  }
};
</script>

<style>
</style>