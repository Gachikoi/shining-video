<template>
  <div class=" bg-white  md:static flex justify-center py-3 px-6 md:p-6">
    <div
      class="w-screen max-w-screen-xl flex justify-between md:justify-start md:divide-x divide-current font-mono font-bold gap-5">
      <div class="flex divide-x-2 divide-current md:divide-none md:flex-col justify-center items-center md:items-start">
        <h2 class="text-xl sm:text-2xl text-nowrap pr-3 md:pr-0">晒你动漫社视频组</h2>
        <h2 class="hidden md:block text-xl">Shining ACG Video Studio</h2>
        <h2 class="text-xl sm:text-2xl pl-3 md:pl-0 md:hidden">{{ route.matched[0]?.name }}</h2>
      </div>
      <div class="hidden md:flex pl-5">
        <img class="w-20" src="../assets/images/社徽镂空无字.png" alt="">
        <img class="w-20" src="../assets/images/视频组镂空无字.png" alt="">
      </div>
      <div
        class="flex md:hidden justify-center items-center select-none cursor-pointer hover:-translate-y-1"
        @click="showMenuNav">
        <div class=" w-10 text-center transition-all" :class="{hidden:isMenuHidden}">Menu</div>
        <div class="w-10 text-center" :class="{hidden:!isMenuHidden}">X</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const isMenuHidden = ref<boolean>(false)
const route = useRoute()

function showMenuNav() {
  isMenuHidden.value = !isMenuHidden.value
  emits('showMenuNav', isMenuHidden.value) 
}

const emits = defineEmits(['showMenuNav'])

defineExpose({ isMenuHidden })
</script>

<style lang="scss" scoped></style>