<template>
  <div class="card">
    <div class="card-image has-padding-15">
      <figure class="image is-128x128">
        <img :src="item.image" alt="ingredient imagem preview" />
      </figure>
    </div>
    <div class="card-content has-padding-15">
      <h1 class="title is-4" v-text="item.title"></h1>
      <div class="description-wrapper">
        <p v-text="item.description" class="description"></p>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-primary is-light" @click="doEmit('update')">Update</button>
        </div>
        <div class="spacer"></div>
        <div class="control">
          <button class="button is-danger is-light" title="Remove" @click="doEmit('remove')">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, required: true }
  },
  setup(props, { emit }) {
    const doEmit = event => {
      emit(event, { item: props.item });
    };
    return { doEmit };
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
.description {
  overflow: hidden;
  position: relative;
  line-height: 1.2em;
  max-height: 3.6em;
  text-align: justify;
  margin-right: -1em;
  padding-right: 1em;
}
.description:before {
  content: "...";
  position: absolute;
  right: 0;
  bottom: 0;
}
.description:after {
  content: "";
  position: absolute;
  right: 0;
  width: 1em;
  height: 1em;
  margin-top: 0.2em;
  background: white;
}
.spacer {
  margin: 0 auto;
}
</style>
