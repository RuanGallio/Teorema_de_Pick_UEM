<script setup lang="ts">
// import HelloWorld from "./components/HelloWorld.vue";
import Footer from "./components/Footer.vue";
import PicksGrid from "./components/PicksGrid.vue";
import Header from "./components/Header.vue";
</script>

<template>
  <div id="app" class="relative flex flex-col h-screen bg-white">
    <Header />
    <PicksGrid />
    <Footer />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
