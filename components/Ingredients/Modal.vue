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
                <input type="text" class="input" v-model="modalIngredient.title" />
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
                <input type="text" class="input" v-model="modalIngredient.description" />
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
                <input type="url" class="input" v-model="modalIngredient.image" />
              </div>
            </div>
          </div>
        </div>
        <div class="is-flex">
          <figure class="image is-128x128">
            <img
              v-if="modalIngredient.image"
              :src="modalIngredient.image"
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
export default {
  props: { ingredient: { type: [Object, Boolean], default: false } },
  setup(props, { emit }) {
    const modalIngredient = ref(
      props.ingredient || { title: "", description: "", image: "" }
    );

    const close = () => {
      emit("close");
    };

    const save = () => {
      emit("save", { ingredient: modalIngredient.value });
    };

    const canSave = computed(
      () =>
        modalIngredient.value.title &&
        modalIngredient.value.description &&
        modalIngredient.value.image
    );

    const title = `${props.ingredient.id ? "Edit" : "Add"} Ingredient`;

    return { modalIngredient, close, save, title, canSave };
  }
};
</script>

<style scoped>
.is-flex {
  justify-content: center;
}
</style>
