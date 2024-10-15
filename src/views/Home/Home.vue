<template>
  <div class="flex flex-col items-center gap-10">
    <div class="flex justify-center w-screen max-w-screen-xl">
      <Carousel class="px-6" :images="carouselImagesStore.images" width="100%" border-radius="0" :shadow-image="true" aspect-ratio="3">
      </Carousel>
    </div>
    <div class="flex justify-center w-screen max-w-screen-xl font-sans">
      <h1 class="text-2xl pb-2 border-b-4 border-red-500 font-mono font-bold">视频组代表作</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Carousel from '@/components/Carousel.vue';
import { useCarouselImagesStore } from '@/store/carouselImages';

const carouselImagesStore = useCarouselImagesStore()
</script>

<style lang="scss" scoped></style>