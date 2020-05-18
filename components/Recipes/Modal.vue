<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title" v-text="title"></p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="columns">
          <div class="column">
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label for class="label">Title</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control is-exanded">
                    <input type="text" class="input" v-model="modalRecipe.title" />
                  </div>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label for class="label">Description</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control is-exanded">
                    <input type="text" class="input" v-model="modalRecipe.description" />
                  </div>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label for class="label">Image</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control is-exanded">
                    <input type="url" class="input" v-model="modalRecipe.image" />
                  </div>
                </div>
              </div>
            </div>
            <div class="is-flex">
              <figure class="image is-128x128">
                <img
                  v-if="modalRecipe.image"
                  :src="modalRecipe.image"
                  alt="ingredient image preview"
                />
              </figure>
            </div>
          </div>
          <div class="column">
            <div class="column">
              <div class="columns">
                <div class="column is-7">
                  <div class="select is-fullwidth">
                    <select
                      v-model="modalIngredient.id"
                      placeholder="Add Ingredient"
                      id="selectIngredient"
                    >
                      <option value></option>
                      <option
                        :value="ingredient.id"
                        v-for="ingredient in ingredients"
                        v-text="ingredient.title"
                        :key="ingredient.id"
                      ></option>
                    </select>
                  </div>
                </div>
                <div class="column">
                  <input
                    type="number"
                    class="input is-expanded"
                    placeholder="Quantity"
                    v-model="modalIngredient.qt"
                  />
                </div>
                <div class="column is-narrow">
                  <button
                    class="button is-primary is-outlined"
                    :disabled="!canAddIngredient"
                    v-text="ingredientButtonName"
                    @click="addIngredient(modalIngredient)"
                  ></button>
                </div>
              </div>
            </div>
            <div class="column">
              <template v-if="modalRecipe.ingredients.length">
                <table class="table is-striped is-fullwidth">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Qt</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="ingredient in modalRecipe.ingredients" :key="ingredient.id">
                      <td v-text="ingredient.title"></td>
                      <td v-text="ingredient.qt"></td>
                      <td class="has-text-right cmd-column">
                        <button
                          class="button is-small is-icon"
                          @click="updateIngredient(ingredient)"
                        >
                          <span class="mdi mdi-pencil"></span>
                        </button>
                        <button
                          class="button is-small is-icon"
                          @click="removeIngredient(ingredient)"
                        >
                          <span class="mdi mdi-delete"></span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </template>
              <template v-else>
                <h4 class="subtitle has-text-centered has-text-bold">No ingredients added</h4>
              </template>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="save" :disabled="!canSave">Save</button>
        <button class="button" @click="close">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
export default {
  props: {
    recipe: { type: [Object, Boolean], default: false },
    ingredients: { type: Array, required: true }
  },
  setup(props, { emit, refs }) {
    const modalRecipe = ref(
      props.recipe || { title: "", description: "", image: "", ingredients: [] }
    );

    const modalIngredient = ref({});

    const canAddIngredient = computed(
      () => modalIngredient.value.id && modalIngredient.value.qt > 0
    );

    const ingredientButtonName = computed(() =>
      modalRecipe.value.ingredients.some(
        someIngredient => someIngredient.id === modalIngredient.value.id
      )
        ? "Update"
        : "Add"
    );

    const selectIngredientRef = ref(null);

    const removeIngredient = ingredient => {
      modalRecipe.value.ingredients = modalRecipe.value.ingredients.filter(
        filterIngredient => filterIngredient.id !== ingredient.id
      );
    };

    const updateIngredient = ingredient => {
      modalIngredient.value = { id: ingredient.id, qt: ingredient.qt };
      modalRecipe.value.ingredients = modalRecipe.value.ingredients.filter(
        filterIngredient => filterIngredient.id !== ingredient.id
      );
      document.querySelector("#selectIngredient").focus();
    };

    const addIngredient = ingredient => {
      if (
        modalRecipe.value.ingredients.some(
          someIngredient => someIngredient.id === ingredient.id
        )
      ) {
        modalRecipe.value.ingredients = modalRecipe.value.ingredients.map(
          mapIngredient =>
            mapIngredient.id === ingredient.id
              ? {
                  ...mapIngredient,
                  qt: mapIngredient.qt + ingredient.qt
                }
              : { ...mapIngredient }
        );
      } else {
        const newIngredient = {
          ...props.ingredients.find(
            findIngredient => findIngredient.id === ingredient.id
          ),
          qt: ingredient.qt
        };
        modalRecipe.value.ingredients = [
          ...modalRecipe.value.ingredients,
          newIngredient
        ];
      }
      modalIngredient.value = {};
    };

    const close = () => {
      emit("close");
    };

    const save = () => {
      emit("save", { recipe: modalRecipe.value });
    };

    const canSave = computed(
      () =>
        modalRecipe.value.title &&
        modalRecipe.value.description &&
        modalRecipe.value.image &&
        modalRecipe.value.ingredients.length
    );

    const title = `${props.recipe.id ? "Edit" : "Add"} Recipe`;

    return {
      modalRecipe,
      close,
      save,
      title,
      canSave,
      modalRecipe,
      modalIngredient,
      canAddIngredient,
      removeIngredient,
      addIngredient,
      updateIngredient,
      ingredientButtonName
    };
  }
};
</script>

<style scoped>
.is-flex {
  justify-content: center;
}
.modal-card {
  width: 1200px;
}
.is-icon {
  border: none;
}
.cmd-column {
  width: 100px;
}
</style>
