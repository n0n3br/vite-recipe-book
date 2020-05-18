<template>
  <div class="container has-margin-top-20">
    <div class="columns">
      <div class="column">
        <input type="text" class="input" v-model="searchInput" placeholder="Search" />
      </div>
      <div class="column is-narrow">
        <button class="button is-primary" @click="create">Create</button>
      </div>
    </div>
    <div class="columns">
      <template v-if="!list.length">
        <div class="column has-text-centered has-margin-top-40">
          <h1 class="title">This list is empty</h1>
          <h2 class="subtitle">Click the Create button</h2>
        </div>
      </template>
      <template v-else>
        <div class="column is-3" v-for="item in filteredList" :key="item.id">
          <ListItem :item="item" @update="update" @remove="remove" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import ListItem from "./ListItem.vue";
export default {
  props: {
    list: { type: Array, required: true }
  },
  components: {
    ListItem
  },
  setup(props, { emit }) {
    const searchInput = ref("");
    const filteredList = computed(() =>
      !searchInput.value
        ? props.list
        : props.list.filter(item =>
            JSON.stringify(item).includes(searchInput.value)
          )
    );
    const update = item => {
      emit("update", item);
    };
    const remove = item => {
      emit("remove", item);
    };
    const create = item => {
      emit("create");
    };
    return {
      filteredList,
      searchInput,
      update,
      remove,
      create
    };
  }
};
</script>
