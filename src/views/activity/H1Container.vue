<template>
  <div class="flex justify-center">
    <div class="flex flex-col items-center gap-6 w-screen max-w-screen-xl px-6">
      <h1 class="pb-2 border-b-4 border-red-500 ">{{ title }}</h1>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { title } = defineProps<{ title: string }>()
</script>

<style lang="scss" scoped></style>