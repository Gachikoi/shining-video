<template>
  <div class="flex flex-col items-center gap-10">
    <Carousel v-if="homeDataStore.carouselImages.length!=0" class="px-6 w-screen max-w-screen-xl"
      :images="homeDataStore.carouselImages" width="100%" border-radius="0" :shadow-image="true" aspect-ratio="2.5">
    </Carousel>
    <div class="flex flex-col items-center w-screen max-w-screen-xl">
      <div class="flex justify-center w-screen max-w-screen-xl font-sans">
        <h1 class="pb-2 border-b-4 border-red-500 ">视频组简介</h1>
      </div>
      <p class="indent-8 m-6 mb-0 max-w-screen-lg tracking-wider leading-loose text-justify">视频组全称Shining ACG Video
        Studio，即晒你动漫社视频组，隶属于宣传部，经过乌鸦、渣渣、令君、梓泠、书名号、掌控-物质、ガチ恋等前辈们和组长们的发展，现在是研习ACG视频制作技术，并为社团提供数字媒体技术支持的部门。内容包括但不限于MAD、MMD、PV制作，书刊及海报设计制作，以及其他实用工具的研究应用。
      </p>
      <p class="indent-8 mx-6 max-w-screen-lg tracking-wider leading-loose text-justify">
        虽然但是，视频组并不需要门槛，大家都是从零开始的。另外，群里除了聊视频制作方面，还会聊管人（尤以国V日V为讨论中心）和一些日常水群，希望大家都能在群里玩得开心！</p>
    </div>
    <div class="flex flex-col w-screen max-w-screen-xl">
      <div class="flex justify-center w-screen max-w-screen-xl font-sans">
        <h1 class="pb-2 border-b-4 border-red-500 ">最新视频产出</h1>
      </div>
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 m-6 mb-0 hover:*:-translate-y-1 *:transition-all">
        <a class="space-y-2 hover:text-red-500 active:text-red-500"
          v-for="{id,link,path,title} in homeDataStore.lastestVideos" :key="id" :href="link" target="_blank">
          <img class="rounded-xl w-full" :src="serverURL+path">
          <p class="text-center text-pretty line-clamp-2 tracking-wide">{{ title }}</p>
        </a>
      </div>=
    </div>
    <div class="flex flex-col w-screen max-w-screen-xl">
      <div class="flex justify-center w-screen max-w-screen-xl font-sans">
        <h1 class="pb-2 border-b-4 border-red-500 ">最新排版产出</h1>
      </div>
      <div class="m-6 mb-0 columns-xs space-y-5 gap-x-5 *:shadow-md">
        <img v-for="image in homeDataStore.lastestTypesettings" :key="image.id"
          style="box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);" :src="serverURL + image.path" alt="">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Carousel from '@/components/Carousel.vue';
import { useHomeDataStore } from '@/store/homeData';
import { serverURL } from '@/api/config';

const homeDataStore = useHomeDataStore()
//如果在setup中使用await，此组件就需要被嵌套在<Suspense>中
//但是如果我们不需要等待异步函数执行的结果，就不需要加上await。
homeDataStore.getLastestVideos()
homeDataStore.getLastestTypesettings()
homeDataStore.getCarouselImages()


</script>

<style lang="scss" scoped></style>