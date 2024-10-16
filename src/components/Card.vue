<template>
  <div class="flex grow-0 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden space-x-5">
    <img class="w-1/6" :src="item.src.href" alt="">
    <div class="flex flex-col justify-center">
      <span class="font-mono text-2xl font-medium">{{ item.name }}</span>
      <span v-if="item.title1">{{ item.title1 }}</span>
      <span v-if="item.title2">{{ item.title2 }}</span>
      <span v-if="item.title3">{{ item.title3 }}</span>
      <span v-if="item.contact">{{ item.contact }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface CardInfo{
  id: number
  src: URL
  name: string
  contact?:string
  title1?: string
  title2?: string
  title3?: string
  biliLink?:string
}

const {item}=defineProps<{item:CardInfo}>()
</script>

<style lang="scss" scoped>

</style>