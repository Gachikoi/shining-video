<template>
  <div class="w-screen h-screen bg-white">
    <div @click="unshowMenuNav"
      class="flex flex-col gap-5  pt-5 pl-6 *:text-lg hover:*:-translate-y-1 *:transition-all">
      <RouterLink :to="{ path: '/home' }">首页</RouterLink>
      <hr>
      <RouterLink :to="{ path: '/works' }">组员作品</RouterLink>
      <hr>
      <RouterLink :to="{ path: '/representation' }">拜年祭 / 社刊</RouterLink>
      <hr>
      <RouterLink :to="{ path: '/activity' }">活动</RouterLink>
      <hr>
      <RouterLink :to="{ path: '/about' }">关于我们</RouterLink>
      <hr>
      <a v-if="!userStore.isLogin" @click="emitter.emit('showLogin')" class="cursor-pointer select-none">登录 / 注册</a>
      <RouterLink v-if="userStore.isLogin" :to="{ path: '/user' }">个人中心</RouterLink>
      <hr v-if="userStore.isLogin">
      <a v-if="userStore.isLogin" @click="userStore.loginOut"><span class="m-auto">登出</span></a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { emitter } from '@/utils/emitter';
import { useUserStore } from '@/store/user';

const userStore=useUserStore()

function unshowMenuNav(e: Event) {
  if ((e.target as HTMLElement).tagName == 'A') {
    emits('unshowMenuNav')
  }
}
const emits = defineEmits(['unshowMenuNav'])
</script>

<style lang="scss" scoped></style>