<template>
  <div class="card">
    <div class="card-image has-padding-15">
      <figure class="image is-128x128">
        <img :src="ingredient.image" alt="ingredient imagem preview" />
      </figure>
    </div>
    <div class="card-content has-padding-15">
      <h1 class="title is-4" v-text="ingredient.title"></h1>
      <div class="description-wrapper">
        <p v-text="ingredient.description" class="description"></p>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-primary is-light" @click="update(ingredient)">Update</button>
        </div>
        <div class="control">
          <button
            class="button is-danger is-light"
            :disabled="!canRemove"
            :title="deleteButtonTitle"
            @click="remove(ingredient)"
          >Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ingredient: { type: Object, required: true },
    canRemove: { type: Boolean, required: true },
    update: { type: Function, required: true },
    remove: { type: Function, required: true }
  },
  setup(props) {
    const deleteButtonTitle = props.canDelete
      ? ""
      : "This ingredient is used in a recipe";
    return {
      deleteButtonTitle
    };
  }
};
</script>

<style scoped>
.card-image {
  display: flex;
  justify-content: center;
}

.description-wrapper {
  height: 3.6em;
}
/* styles for '...' */
.description {
  /* hide text if it more than N lines  */
  overflow: hidden;
  /* for set '...' in absolute position */
  position: relative;
  /* use this value to count block height */
  line-height: 1.2em;
  /* max-height = line-height (1.2) * lines max number (3) */
  max-height: 3.6em;
  /* fix problem when last visible word doesn't adjoin right side  */
  text-align: justify;
  /* place for '...' */
  margin-right: -1em;
  padding-right: 1em;
}
/* create the ... */
.description:before {
  /* points in the end */
  content: "...";
  /* absolute position */
  position: absolute;
  /* set position to right bottom corner of block */
  right: 0;
  bottom: 0;
}
/* hide ... if we have text, which is less than or equal to max lines */
.description:after {
  /* points in the end */
  content: "";
  /* absolute position */
  position: absolute;
  /* set position to right bottom corner of text */
  right: 0;
  /* set width and height */
  width: 1em;
  height: 1em;
  margin-top: 0.2em;
  /* bg color = bg color under block */
  background: white;
}
</style>
