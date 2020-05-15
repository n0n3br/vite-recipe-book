<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title" v-text="title"></p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label for class="label">Title</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control is-exanded">
                <input type="text" class="input" v-model="newIngredient.title" />
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
                <input type="text" class="input" v-model="newIngredient.description" />
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
                <input type="url" class="input" v-model="newIngredient.image" />
              </div>
            </div>
          </div>
        </div>
        <div class="is-flex">
          <figure class="image is-128x128">
            <img
              v-if="newIngredient.image"
              :src="newIngredient.image"
              alt="ingredient image preview"
            />
          </figure>
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
import { ref, computed } from "vue";
import { useIngredients } from "../store";
export default {
  props: { ingredient: { type: Object, default: {} } },
  setup(props, { emit }) {
      
    const newIngredient = ref(
      props.ingredient.id
        ? { ...ingredient }
        : { title: "", description: "", image: "" }
    );

    const store = useIngredients();

    const ingredients = store.ingredients;

    const close = () => {
      emit("close");
    };

    const save = () => {
      if (newIngredient.id) {
        store.update(newIngredient.value);
      } else store.add(newIngredient.value);
      close();
    };

    const canSave = computed(
      () =>
        newIngredient.value.title &&
        newIngredient.value.description &&
        newIngredient.value.image
    );

    const title = `${props.ingredient.id ? "Edit" : "Add"} Ingredient`;

    return { newIngredient, close, save, title, canSave };
  },
  mounted() {
    console.log("ingredient", this.newIngredient);
  }
};
</script>

<style scoped>
.is-flex {
  justify-content: center;
}
</style>
