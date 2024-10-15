<template>
  <Header></Header>
  <Nav></Nav>
  <Home class="mt-6"></Home>
  <div class="h-96"></div>
  <Footer></Footer>
</template>

<script lang="ts" setup>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import Nav from './components/Nav.vue';
import Home from './views/Home/Home.vue';
</script>

<style lang="css" scoped></style>