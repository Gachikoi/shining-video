import { defineStore } from "pinia";
import { ref } from "vue";
import {type CarouselImages } from "@/components/Carousel.vue";

export const useCarouselImagesStore = defineStore('CarouselImages', () => {
  const images = ref<CarouselImages>([
    {
      id: 0,
      src: new URL("../assets/images/1.png", import.meta.url),
      alt: "陈晓月"
    },
    {
      id: 1,
      src: new URL("../assets/images/2.png", import.meta.url),
      alt: "集章册正面"
    },
    {
      id: 2,
      src: new URL("../assets/images/3.png", import.meta.url),
      alt: "若似霜"
    },
    {
      id: 3,
      src: new URL("../assets/images/4.png", import.meta.url),
      alt: "集章册反面"
    },
    {
      id: 4,
      src: new URL("../assets/images/5.png", import.meta.url),
      alt: "表表表面"
    }
  ])

  return {images}
})