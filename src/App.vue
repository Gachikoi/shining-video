<template>
  <Header ref="header" class="shadow-md md:shadow-none" @show-menu-nav="showMenuNav"></Header>
  <MenuNav :class="{ 'translate-x-0': isMenuHidden }" class="absolute z-10 md:hidden -translate-x-[100%] transition-all"
    @unshow-menu-nav="unshowMenuNav"></MenuNav>
  <Nav class="hidden md:block"></Nav>
  <router-view class="mt-10" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <Forum class="mt-10"></Forum>
  <Footer class="mt-10"></Footer>
  <!-- Login弹窗 -->
  <Login v-if="dialogFormVisible" v-model="dialogFormVisible"></Login>
</template>

<script lang="ts" setup>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import Nav from './components/Nav.vue';
import MenuNav from './components/MenuNav.vue';
import Forum from './components/Forum.vue';
import { ref } from 'vue';
import { useTemplateRef } from 'vue';
import Login from './components/Login.vue';
import { emitter } from '@/utils/emitter';

const dialogFormVisible = ref(false)
emitter.on('showLogin', () => {
  dialogFormVisible.value = true
})

let isMenuHidden = ref(false)
const header = useTemplateRef('header')

function showMenuNav(val: boolean) {
  isMenuHidden.value = val
}

function unshowMenuNav() {
  isMenuHidden.value = !isMenuHidden.value
  header.value!.isMenuHidden = isMenuHidden.value
}
</script>

<style lang="css" scoped></style>