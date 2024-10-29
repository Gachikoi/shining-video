<template>
  <a :href="item.bililink" target="_blank">
    <div class="overflow relative flex flex-col items-center sm:flex-row rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all space-x-0 sm:space-x-5 ">
      <div class="shrink-0">
        <img :loading="loading" class="w-16 sm:w-24 lg:w-28 h-16 sm:h-24 lg:h-28 rounded-full"
          :src="serverURL + item.path" alt="">
      </div>
      <div class="flex flex-col justify-center items-center sm:items-start">
        <span class="font-mono text-xl font-medium break-all whitespace-pre-wrap hyphens-auto">{{ item.name }}</span>
        <span class="break-all whitespace-pre-wrap hyphens-auto" v-if="item.title">{{ item.title }} </span>
        <span class="break-all whitespace-pre-wrap hyphens-auto" v-if="item.contact">{{ item.contact}}</span>
      </div>
      <img v-if="item.bililink" class="absolute right-2 top-2 sm:right-4 sm:top-4 lg:max-xl:right-2  opacity-80 text-sm" width="16"
        height="16" src="https://img.icons8.com/ios-filled/50/forward-arrow.png" alt="up-right-arrow" />
    </div>
  </a>
</template>

<script lang="ts" setup>
import { serverURL } from '@/api/config'

export interface CardInfo {
  path: string
  name: string
  contact?: string
  title?: string
  bililink?: string
}

const { item, loading = 'eager' } = defineProps<{ item: CardInfo, loading?: "lazy" | "eager" }>()

</script>

<style lang="scss" scoped></style>