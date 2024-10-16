<template>
  <!-- sticky依赖于其最近的可以滚动的祖先元素，所以如果sticky不设置在nav的顶层容器上，就会失效 -->
  <div class="sticky top-0 z-10 ">
    <div class="flex justify-center bg-red-500 px-6 font-sans text-white">
      <div
        class="flex j w-screen max-w-screen-xl *:w-32 *:h-14 *:flex *:justify-center *:items-center *:transition-all">
        <RouterLink :to="{ path: '/home' }" class="*:hover:-translate-y-1 *:hover:drop-shadow-md *:transition-all">
          <span>首页</span>
        </RouterLink>
        <RouterLink :to="{ path: '/video' }" class="*:hover:-translate-y-1 *:hover:drop-shadow-md *:transition-all">
          <span>组员作品</span>
        </RouterLink>
        <RouterLink :to="{ path: '/typesetting' }"
          class="*:hover:-translate-y-1 *:hover:drop-shadow-md *:transition-all">
          <span>拜年祭</span>
        </RouterLink>
        <RouterLink :to="{ path: '/activity' }" class="*:hover:-translate-y-1 *:hover:drop-shadow-md *:transition-all">
          <span>活动</span>
        </RouterLink>
        <RouterLink :to="{ path: '/history' }" class="*:hover:-translate-y-1 *:hover:drop-shadow-md *:transition-all">
          <span>历史</span>
        </RouterLink>
      </div>
      <div class="flex shrink-0 justify-center items-center w-32 h-14">
        登录 / 注册
      </div>
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