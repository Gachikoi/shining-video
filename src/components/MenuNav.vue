<template>
  <div class="w-screen h-screen bg-white">
    <div @click="unshowMenuNav"
      class="flex flex-col gap-5  pt-5 pl-6 *:text-lg hover:*:-translate-y-1 *:transition-all">
      <RouterLink :to="{path:'/home'}">首页</RouterLink>
      <hr>
      <RouterLink :to="{path:'/video'}">组员作品</RouterLink>
      <hr>
      <RouterLink :to="{path:'/typesetting'}">拜年祭</RouterLink>
      <hr>
      <RouterLink :to="{path:'/activity'}">活动</RouterLink>
      <hr>
      <RouterLink :to="{ path: '/history' }">历史</RouterLink>
      <hr>
      <a>登录 / 注册</a>
    </div>
  </div>
</template>

<script lang="ts" setup>

function unshowMenuNav(e: Event) {
  if ((e.target as HTMLElement).tagName=='A') {
    emits('unshowMenuNav')
  }
}

const emits = defineEmits(['unshowMenuNav'])
</script>

<style lang="scss" scoped>
</style>