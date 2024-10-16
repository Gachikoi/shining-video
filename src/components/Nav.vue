<template>
  <!-- sticky依赖于其最近的可以滚动的祖先元素，所以如果sticky不设置在nav的顶层容器上，就会失效 -->
  <div class="sticky top-0 z-10 ">
    <div class="flex justify-center bg-red-500 font-sans text-white">
      <div class="flex justify-between w-screen px-6 max-w-screen-xl overflow-scroll">
        <div class="flex *:w-32 *:h-14 *:flex *:justify-center *:items-center *:transition-all">
          <RouterLink :to="{ path: '/home' }" class="*:hover:-translate-y-1 *:hover:drop-shadow-md *:transition-all">
            <span>首页</span>
          </RouterLink>
          <RouterLink :to="{ path: '/works' }" class="*:hover:-translate-y-1 *:hover:drop-shadow-md *:transition-all">
            <span>组员作品</span>
          </RouterLink>
          <RouterLink :to="{ path: '/representation' }"
            class="*:hover:-translate-y-1 *:hover:drop-shadow-md *:transition-all">
            <span>拜年祭 / 社刊</span>
          </RouterLink>
          <RouterLink :to="{ path: '/activity' }"
            class="*:hover:-translate-y-1 *:hover:drop-shadow-md *:transition-all">
            <span>活动</span>
          </RouterLink>
          <RouterLink :to="{ path: '/about' }" class="*:hover:-translate-y-1 *:hover:drop-shadow-md *:transition-all">
            <span>关于我们</span>
          </RouterLink>
        </div>
        <a class="flex shrink-0 justify-center items-center w-32 h-14 *:hover:-translate-y-1 *:hover:drop-shadow-md *:transition-all active:bg-red-700 " @click="">
          <span>登录 / 注册</span>
        </a>
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
.overflow-scroll::-webkit-scrollbar{
  display: none;
}
</style>