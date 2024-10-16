<template>
  <div class="px-6 space-y-5 flex justify-center">
    <div class="md:flex space-y-10 w-screen max-w-screen-xl">
      <div class="basis-1/2 space-y-5">
        <h1 class="font-mono text-3xl font-bold">视频组官网于2024年建成并开始运营</h1>
        <Card v-for="item in info" :key="item.id" :item></Card>
      </div>
      <div class="basis-1/2">
        <h1 class="font-mono text-3xl font-bold">视频组于2017年成立并开始活动</h1>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Card from '@/components/Card.vue';
import { ref } from 'vue';

const info = ref([
  {
    id: 0,
    src: new URL('../../assets/images/乌鸦.jpg', import.meta.url),
    name: "乌鸦",
    title3: '创始人',
  },
  {
    id: 1,
    src: new URL('../../assets/images/渣渣.jpg', import.meta.url),
    name: "渣渣",
    title1: '一代目',
    title3: '创始人'
  },
  {
    id: 2,
    src: new URL('../../assets/images/令君.jpg', import.meta.url),
    name: "令君",
    title3: '创始人',
  },
  {
    id: 3,
    src: new URL('../../assets/images/梓泠.jpg', import.meta.url),
    name: "梓泠",
    title1: '二代目',
  },
  {
    id: 4,
    src: new URL('../../assets/images/书名号.jpg', import.meta.url),
    name: "书名号",
    title1: '三代目',
  },
  {
    id: 5,
    src: new URL('../../assets/images/掌控-物质.jpg', import.meta.url),
    name: "掌控-物质",
    title1: '四代目',
  },
  {
    id: 6,
    src: new URL('../../assets/images/ガチ恋.jpg', import.meta.url),
    name: "ガチ恋",
    title1: '五代目',
    title2: '站长',
    contact:'QQ：3181259291',
    biliLink: 'www.bilibili.com/'
  },
  {
    id: 7,
    src: new URL('../../assets/images/高冷.jpg', import.meta.url),
    name: "高冷",
    title1: '六代目',
    title2: '现任组长',
    contact: 'QQ：3181259291',
    biliLink: 'www.bilibili.com/'
  },
])
</script>

<style lang="scss" scoped></style>