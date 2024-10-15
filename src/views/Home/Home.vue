<template>
  <div class="flex justify-center">
    <div class="flex justify-center w-screen max-w-screen-xl">
      <Carousel :images="carouselImagesStore.images" width="100%" border-radius="0" :shadow-image="true" aspect-ratio="3">
      </Carousel>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Carousel from '@/components/Carousel.vue';
import { useCarouselImagesStore } from '@/store/carouselImages';

const carouselImagesStore = useCarouselImagesStore()
</script>

<style lang="scss" scoped></style>