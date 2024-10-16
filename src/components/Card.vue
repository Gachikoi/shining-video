<template>
  <a class="" v-if="item.title" :href="item.bililink" target="_blank">
    <div class="flex rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all overflow space-x-5 relative">
      <div class="w-20 sm:w-24 lg:w-28">
        <img class="w-full rounded-full" :src="item.src.href" alt="">
      </div>
      <div class="flex flex-col justify-center">
        <span class="font-mono text-xl font-medium">{{ item.name }}</span>
        <span>{{ item.title }} </span>
        <span v-if="item.contact">{{ item.contact }}</span>
      </div>
      <div v-if="item.bililink" class="absolute right-4 top-4 opacity-80 text-sm"><img width="16" height="16"
          src="https://img.icons8.com/tiny-glyph/16/up-right-arrow.png" alt="up-right-arrow"
          class="absolute top-5 right-3" />去b站</div>
    </div>
  </a>
</template>

<script lang="ts" setup>
export interface CardInfo {
  src: URL
  name: string
  contact?: string
  title?: string
  bililink?: string
}

const { item } = defineProps<{ item: CardInfo }>()
</script>

<style lang="scss" scoped></style>