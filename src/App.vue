<template>
  <Header class="shadow-md md:shadow-none" @show-menu-nav="showMenuNav"></Header>
  <MenuNav :class="{'translate-x-0':isMenuHidden}" class="absolute z-10 md:hidden -translate-x-[100%] transition-all"></MenuNav>
  <Nav class="hidden md:block"></Nav>
  <RouterView class="mt-10"></RouterView>
  <div class="h-96"></div>
  <Footer></Footer>
</template>

<script lang="ts" setup>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import Nav from './components/Nav.vue';
import Home from './views/home/Home.vue';
import MenuNav from './components/MenuNav.vue';
import { ref } from 'vue';
import { fa } from 'element-plus/es/locales.mjs';

let isMenuHidden=ref(false)
function showMenuNav(val:boolean) {
  isMenuHidden.value = val
}
</script>

<style lang="css" scoped></style>