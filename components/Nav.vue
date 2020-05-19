<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">ViteRecipeBook</router-link>
    </div>
    <div class="navbar-menu">
      <div class="navbar-end">
        <router-link
          class="navbar-item"
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          v-text="link.text"
        ></router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const links = [
      { to: "/ingredients", text: "Ingredients" },
      { to: "/recipes", text: "Recipes" }
    ];
    const router = useRouter();

    const currentRoutePath = computed(() => router.value.currentRoute.path);

    const linkClass = link => (link.to === currentRoutePath ? "active" : "");

    return { links, linkClass };
  }
};
</script>

<style scoped>
.router-link-active {
  background-color: #00b89c;
}
</style>
