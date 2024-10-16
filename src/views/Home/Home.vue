<template>
  <div class="flex flex-col items-center gap-10">
    <Carousel v-if="isParentMounted" class="px-6 w-screen max-w-screen-xl" :images="carouselImagesStore.images"
      width="100%" border-radius="0" :shadow-image="true" aspect-ratio="3">
    </Carousel>
    <div class="flex flex-col w-screen max-w-screen-xl">
      <div class="flex justify-center w-screen max-w-screen-xl font-sans">
        <h1 class="text-2xl pb-2 border-b-4 border-red-500 font-mono font-bold">视频组简介</h1>
      </div>
      <p class="indent-8 m-6 mb-0 tracking-wide leading-relaxed text-justify">视频组全称Shining ACG Video
        Studio，即晒你动漫社视频组，隶属于宣传部，经过乌鸦、渣渣、令君、梓泠、书名号、掌控-物质、ガチ恋等前辈们和组长们的发展，现在是研习ACG视频制作技术，并为社团提供数字媒体技术支持的部门。内容包括但不限于MAD、MMD、PV制作，书刊及海报设计制作，以及其他实用工具的研究应用。
      </p>
      <p class="indent-8 m-6 mt-0 tracking-wide leading-relaxed text-justify">
        虽然但是，视频组并不需要门槛，大家都是从零开始的。另外，群里除了聊视频制作方面，还会聊管人（尤以国V日V为讨论中心）和一些日常水群，希望大家都能在群里玩得开心！</p>
    </div>
    <div class="flex flex-col w-screen max-w-screen-xl">
      <div class="flex justify-center w-screen max-w-screen-xl font-sans">
        <h1 class="text-2xl pb-2 border-b-4 border-red-500 font-mono font-bold">最新视频产出</h1>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 m-6 hover:*:-translate-y-1 *:transition-all">
        <a class="space-y-2 hover:text-red-500 active:text-red-500" v-for="info in videoInfoStore.homeVideoInfo"
          :key="info.id" :href="info.link" target="_blank">
          <img class="rounded-xl w-full" :src="info.src.href" :alt="info.alt">
          <p class="text-center text-pretty line-clamp-2 tracking-wide">{{ info.title }}</p>
        </a>
      </div>
    </div>
    <div class="flex flex-col w-screen max-w-screen-xl">
      <div class="flex justify-center w-screen max-w-screen-xl font-sans">
        <h1 class="text-2xl pb-2 border-b-4 border-red-500 font-mono font-bold">最新排版产出</h1>
      </div>
      <div class="m-6 columns-xs space-y-5 gap-x-5 *:shadow-md">
        <img style="box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);" src="../../assets/images/2024视频组迎新晚会海报1.png" alt="">
        <img style="box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);" src="../../assets/images/2024招新海报1.png" alt="">
        <img style="box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);" src="../../assets/images/1.png" alt="">
        <img style="box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);" src=" ../../assets/images/3.png" alt="">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Carousel from '@/components/Carousel.vue';
import { useCarouselImagesStore } from '@/store/carouselImages';
import { useVideoInfoStore } from '@/store/videoInfo';
import { onMounted, ref } from 'vue';

const carouselImagesStore = useCarouselImagesStore()
const videoInfoStore = useVideoInfoStore()
const isParentMounted = ref(false)

onMounted(() => {
  isParentMounted.value = true
})
</script>

<style lang="scss" scoped></style>