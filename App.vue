<template>
    <Nav />
    <main>
        <router-view />
    </main>
</template>

<script>
import Nav from "./components/Nav.vue";
export default {
    name: "Vite Recipe Book",
    components: {
        Nav,
    },
};
</script>
