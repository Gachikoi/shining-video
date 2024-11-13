<template>
  <a :href="serverURL + path" target="_blank" class="flex flex-col items-center cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all">
    <img width="258" height="365" :src="serverURL + coverPath" alt="">
    <span class="scroll overflow-scroll px-3 bg-red-500 text-white w-full text-center leading-10 text-nowrap">{{ title }}</span>
  </a>
</template>

<script lang="ts" setup>
import { serverURL } from '@/api/config';

const { coverPath, path, title } = defineProps<{ coverPath: string, path: string, title: string, description?: string }>()
</script>

<style lang="scss" scoped>
.scroll::-webkit-scrollbar {
  display: none;
  /* 隐藏 WebKit 内核的滚动条 */
}
</style>