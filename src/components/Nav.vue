<template>
  <div class="sticky top-0 z-10 flex justify-center bg-red-500 px-6 font-sans text-white">
    <div class="flex w-screen max-w-screen-xl *:w-32 *:h-14 *:flex *:justify-center *:items-center *:transition-all">
      <RouterLink :to="{ path: '/home' }" class="hover:*:-translate-y-1 hover:*:drop-shadow-md *:transition-all">
        <span>首页</span>
      </RouterLink>
      <RouterLink :to="{ path: '/video' }" class="hover:*:-translate-y-1 hover:*:drop-shadow-md *:transition-all">
        <span>视频作品</span>
      </RouterLink>
      <RouterLink :to="{ path: '/typesetting' }" class="hover:*:-translate-y-1 hover:*:drop-shadow-md *:transition-all">
        <span>排版作品</span>
      </RouterLink>
      <RouterLink :to="{ path: '/activity' }" class="hover:*:-translate-y-1 hover:*:drop-shadow-md *:transition-all">
        <span>活动</span>
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>

.router-link-active {
  background: #b91c1c;
}
</style>