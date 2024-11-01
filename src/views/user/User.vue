<template>
  <div class="flex justify-center" ref="container">
    <div class="relative flex flex-col md:flex-row justify-center  gap-10 md:gap-20 max-w-screen-xl w-screen px-6">
      <div class="md:absolute left-6 top-0 flex flex-row md:flex-col justify-center md:justify-start shrink-0 *:text-white *:p-5  *:bg-red-500">
        <RouterLink :to="{ path: '/user/changeUserInfo' }"
          class="*:hover:-translate-y-1 *:hover:drop-shadow-md *:transition-all">
          <div class="text-center">个人信息更改</div>
        </RouterLink>
        <RouterLink :to="{ path: '/user/submitMemberInfo' }"
          class="*:hover:-translate-y-1 *:hover:drop-shadow-md *:transition-all">
          <div class="text-center">提交成员信息</div>
        </RouterLink>
        <RouterLink :to="{ path: '/user/submitWorksInfo' }"
          class="*:hover:-translate-y-1 *:hover:drop-shadow-md *:transition-all">
          <div class="text-center">编辑作品信息</div>
        </RouterLink>
      </div>
      <RouterView class="w-full">
      </RouterView>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onActivated, onBeforeUnmount, onMounted, ref } from 'vue';
import { emitter } from '@/utils/emitter';
import router from '@/router/router';

const container = ref()

onMounted(() => {
  router.push({ path: '/user/changeUserInfo' })
  emitter.on('loginOut', () => {
    (container.value as HTMLElement).classList.add('hidden')
  })

  emitter.on('loginIn', () => {
    (container.value as HTMLElement).classList.remove('hidden')
  })
})

onBeforeUnmount(() => {
  emitter.off('loginOut')
  emitter.off('loginIn')
})
</script>

<style lang="scss" scoped>
.router-link-active {
  background: #b91c1c;
}
</style>