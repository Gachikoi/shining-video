<template>
  <a :href="item.bililink" target="_blank">
    <div class="flex rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all overflow space-x-5 relative">
      <div class="w-20 sm:w-24 lg:w-28">
        <img :loading="loading" class="w-full rounded-full" :src="serverURL + item.path" alt="">
      </div>
      <div class="flex flex-col justify-center">
        <span class="font-mono text-xl font-medium">{{ item.name }}</span>
        <span v-if="item.title">{{ item.title }} </span>
        <span v-if="item.contact">{{ item.contact }}</span>
      </div>
      <img v-if="item.bililink" class="absolute right-5 top-5 opacity-80 text-sm" width="16" height="16"
        src="https://img.icons8.com/tiny-glyph/16/up-right-arrow.png" alt="up-right-arrow" />
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