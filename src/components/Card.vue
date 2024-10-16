<template>
  <a class="" v-if="item.title" :href="item.bililink" target="_blank">
    <div class="flex rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all overflow space-x-5">
      <img class="w-1/6 rounded-full" :src="item.src.href" alt="">
      <div class="flex flex-col justify-center">
        <span class="font-mono text-xl font-medium">{{ item.name }}</span>
        <span>{{ item.title }} </span>
        <span v-if="item.contact">{{ item.contact }}</span>
      </div>
    </div>
  </a>
</template>

<script lang="ts" setup>
export interface CardInfo {
  src: URL
  name: string
  contact?:string
  title?: string
  bililink?: string
}

const { item } = defineProps<{ item: CardInfo }>()
</script>

<style lang="scss" scoped></style>