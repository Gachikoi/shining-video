<template>
  <div>
    <!-- //方案1 -->
    <div class="flex flex-col sm:hidden w-full ">
      <div class="pb-5">
        <div class="flex gap-2">
          <slot name="avatar"></slot>
          <div class="flex flex-col w-full gap-2">
            <slot name="name"></slot>
            <div class="flex justify-between">
              <slot name="date"></slot>
              <button class="hover:text-red-500 text-neutral-400 text-sm">删除</button>
            </div>
          </div>
        </div>
      </div>
      <slot name="content"></slot>
    </div>
    <!-- //方案2 -->
    <div class="hidden sm:flex  items-center w-full gap-5">
      <div class="shrink-0 self-start">
        <slot name="avatar" class=""></slot>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <slot name="name"></slot>
        <slot name="content"></slot>
        <div class="flex justify-between text-neutral-400 text-sm">
          <slot name="date"></slot>
          <button class="hover:text-red-500">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped></style>