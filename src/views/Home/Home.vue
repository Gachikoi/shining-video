<template>
  <div class="flex flex-col items-center gap-10">
    <Carousel v-if="isParentMounted" class="px-6 w-screen max-w-screen-xl" :images="carouselImagesStore.images" width="100%"
      border-radius="0" :shadow-image="true" aspect-ratio="3">
    </Carousel>
    <div class="flex flex-col w-screen max-w-screen-xl">
      <div class="flex justify-center w-screen max-w-screen-xl font-sans">
        <h1 class="text-2xl pb-2 border-b-4 border-red-500 font-mono font-bold">视频组作品</h1>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 m-6 hover:*:-translate-y-1 *:transition-all">
        <a class="space-y-2 hover:text-red-500 active:text-red-500" v-for="info in videoInfoStore.homeVideoInfo" :key="info.id" :href="info.link" target="_blank">
          <img class="rounded-xl w-full" :src="info.src.href" :alt="info.alt">
          <p class="text-center">{{ info.title }}</p>
        </a>
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