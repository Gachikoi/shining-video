<template>
  <div class="w-screen h-screen bg-white">
    <div
      class="flex flex-col gap-5  pt-5 pl-6 *:text-lg hover:*:-translate-y-1 *:transition-all">
      <RouterLink :to="{path:'/home'}">首页</RouterLink>
      <hr>
      <RouterLink :to="{path:'/video'}">视频作品</RouterLink>
      <hr>
      <RouterLink :to="{path:'/typesetting'}">排版作品</RouterLink>
      <hr>
      <RouterLink :to="{path:'/activity'}">活动</RouterLink>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
</style>