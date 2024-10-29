<template>
  <!-- sticky依赖于其最近的可以滚动的祖先元素，所以如果sticky不设置在nav的顶层容器上，就会失效 -->
  <div class="sticky top-0 z-10 ">
    <div class="flex justify-center bg-red-500 font-sans text-white">
      <div class="flex justify-between w-screen px-6 max-w-screen-xl ">
        <div class="flex *:w-32 *:h-14 *:flex *:justify-center *:items-center *:transition-all container">
          <RouterLink :to="{ path: '/home' }" class="*:hover:-translate-y-1 *:hover:drop-shadow-md *:transition-all">
            <span>首页</span>
          </RouterLink>
          <RouterLink :to="{ path: '/works' }" class="*:hover:-translate-y-1 *:hover:drop-shadow-md *:transition-all">
            <span>组员作品</span>
          </RouterLink>
          <RouterLink :to="{ path: '/representation' }" class="*:hover:-translate-y-1 *:hover:drop-shadow-md *:transition-all">
            <span>社刊</span>
          </RouterLink>
          <RouterLink :to="{ path: '/activity' }" class="*:hover:-translate-y-1 *:hover:drop-shadow-md *:transition-all">
            <span>活动</span>
          </RouterLink>
          <RouterLink :to="{ path: '/about' }" class="*:hover:-translate-y-1 *:hover:drop-shadow-md *:transition-all">
            <span>关于我们</span>
          </RouterLink>
        </div>
        <a v-if="!userStore.isLogin" class="flex shrink-0 justify-center items-center w-32 h-14 *:hover:-translate-y-1 *:hover:drop-shadow-md *:transition-all active:bg-red-700 
          cursor-pointer" @click="emitter.emit('showLogin')">
          <span>登录 / 注册</span>
        </a>
        <div v-else class="relative w-32 h-14 text-center">
          <div class="absolute flex shrink-0 flex-col group  *:bg-red-500 active:*:bg-red-700">
            <RouterLink :to="{ path: '/user' }"
              class="flex justify-center items-center w-32 h-14 *:hover:-translate-y-1 *:hover:drop-shadow-md *:transition-all cursor-pointer">
              <div>
                <span>个人中心</span>
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </div>
            </RouterLink>
            <hr class="border-current">
            <a class="overflow-hidden flex justify-center items-center w-32 h-0 group-hover:h-14 transition-all rounded-bl-lg rounded-br-lg *:hover:-translate-y-1 *:hover:drop-shadow-md *:transition-all cursor-pointer"
              @click="userStore.loginOut">
              <span>登出</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { emitter } from '@/utils/emitter';
import { ArrowDown } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user';

const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.router-link-active {
  background: #b91c1c;
}

.container {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
</style>