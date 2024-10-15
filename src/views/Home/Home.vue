<template>
  <Carousel class="hidden md:block" :images="carouselImagesStore.images"></Carousel>
</template>

<script lang="ts" setup>
import Carousel from '@/components/Carousel.vue';
import { useCarouselImagesStore } from '@/store/carouselImages';

const carouselImagesStore=useCarouselImagesStore()
</script>

<style lang="scss" scoped></style>