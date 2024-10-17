<template>
  <div class="flex justify-center">
    <div class="flex flex-col items-center space-y-10">
      <div class="w-full h-[200rem]"></div>
      <!-- top -->
      <div class="px-6 flex flex-col items-center w-screen max-w-screen-xl *:space-y-5">
        <h1 class="text-2xl pb-2 border-b-4 border-red-500 font-mono font-bold">关于我们</h1>
        <p class="w-1/2 m-6 mb-0 tracking-wide leading-loose text-center">
          晒你动漫社视频组官网旨在展示组内文化、作品、活动与历史。
        </p>
        <p class="w-1/2 m-6 mt-0 tracking-wide leading-relaxed text-center">
          我们希望为视频组成员提供一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个
          一个一个一个。
        </p>
      </div>
      <!-- middle -->
      <div
        class="px-6 md:flex justify-center space-y-10 md:space-y-0 md:space-x-5 w-screen max-w-screen-xl *:space-y-5">
        <!-- left -->
        <div class="basis-1/2 flex flex-col items-center">
          <h1 class="font-mono text-2xl font-bold text-center pb-2 border-b-4 border-red-500">
            视频组官网于2024年建成并开始运营</h1>
          <div class="flex flex-col-reverse">
            <Card v-for="{ id, src, name, contact, title2: title, bililink } in info" :key="id"
              :item="{ src, name, contact, title, bililink }"></Card>
          </div>
          <h2 class="text-center font-mono text-xl font-bold text-pretty">特别感谢</h2>
          <p class="text-center">暂无</p>
        </div>
        <!-- right -->
        <div class="basis-1/2 flex flex-col items-center">
          <h1 class="font-mono text-2xl font-bold text-center pb-2 border-b-4 border-red-500">
            视频组于2017年成立并开始活动</h1>
          <div class="flex flex-wrap justify-center">
            <Card v-for="{ id, src, name, contact, title3: title, bililink } in info" :key="id"
              :item="{ src, name, contact, title, bililink }"></Card>
          </div>
          <hr class="border-2 w-10/12">
          <div class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            <Card v-for="{ id, src, name, contact, title1: title, bililink } in info" :key="id"
              :item="{ src, name, contact, title, bililink }"></Card>
          </div>
        </div>
      </div>
      <!-- bottom -->
      <div class="px-6 flex flex-col flex-wrap items-center w-screen max-w-screen-xl space-y-5">
        <h1 class="font-mono text-2xl font-bold text-pretty pb-2 border-b-4 border-red-500">视频组组员</h1>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Card v-for="{ id, src, name, contact, title1: title, bililink } in info" :key="id"
            :item="{ src, name, contact, title, bililink }" loading="lazy"></Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Card from '@/components/Card.vue';
import { onMounted, ref } from 'vue';
const image = ref({

  src: new URL("../../assets/images/2024xixiaodian.png", import.meta.url),
  name: '1',
  title:'1'
})
const info = ref([
  {
    id: 0,
    src: new URL('../../assets/images/wuya.jpg', import.meta.url),
    name: "乌鸦",
    title3: '创始人',
  },
  {
    id: 1,
    src: new URL('../../assets/images/zhazha.jpg', import.meta.url),
    name: "渣渣",
    title1: '一代目',
    title3: '创始人'
  },
  {
    id: 2,
    src: new URL('../../assets/images/lingjun.jpg', import.meta.url),
    name: "令君",
    title3: '创始人',
  },
  {
    id: 3,
    src: new URL('../../assets/images/ziling.jpg', import.meta.url),
    name: "梓泠",
    title1: '二代目',
  },
  {
    id: 4,
    src: new URL('../../assets/images/shuminghao.jpg', import.meta.url),
    name: "书名号",
    title1: '三代目',
  },
  {
    id: 5,
    src: new URL('../../assets/images/zhangkongwuzhi.jpg', import.meta.url),
    name: "掌控-物质",
    title1: '四代目',
  },
  {
    id: 6,
    src: new URL('../../assets/images/gachi.jpg', import.meta.url),
    name: "ガチ恋",
    title1: '五代目',
    title2: '站长',
    contact: 'QQ：3181259291',
    bililink: 'https://space.bilibili.com/191719991'
  },
  {
    id: 7,
    src: new URL('../../assets/images/gaoleng.jpg', import.meta.url),
    name: "高冷",
    title1: '六代目',
    title2: '现任组长',
    contact: 'QQ：3181259291',
    bililink: 'https://space.bilibili.com/456731002'
  },
])
</script>

<style lang="scss" scoped></style>