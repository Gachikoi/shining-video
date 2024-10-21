import { defineStore } from "pinia";
import { ref } from "vue";
import { reqCarouselImages, reqLastestTypesettings, reqLastestVideos, type CarouselImageArr, type LastestTypesettingArr, type LastestVideoArr } from "@/api/home";
import type { AxiosResponse } from "axios";

export const useHomeDataStore = defineStore('HomeData', () => {
  const lastestVideos = ref<LastestVideoArr>([])
  const lastestTypesettings = ref<LastestTypesettingArr>([])
  const carouselImages = ref<CarouselImageArr>([])

  async function getLastestVideos() {
    const result: AxiosResponse<LastestVideoArr> = await reqLastestVideos()
    if (result.status == 200) {
      lastestVideos.value = result.data
    }
  }
  async function getLastestTypesettings() {
    const result: AxiosResponse<LastestTypesettingArr> = await reqLastestTypesettings()
    if (result.status == 200) {
      lastestTypesettings.value = result.data
    }
  }
  async function getCarouselImages() {
    const result: AxiosResponse<CarouselImageArr> = await reqCarouselImages()
    if (result.status == 200) {
      carouselImages.value = result.data
    }
  }

  return { lastestVideos,lastestTypesettings,carouselImages,getLastestVideos,getLastestTypesettings,getCarouselImages }
})