<template>
  <div class="flex justify-center">
    <div class="flex justify-center gap-20 max-w-screen-xl w-screen px-6" ref="container">
      <ul class="flex flex-col *:text-white *:p-5 *:bg-red-500">
        <li>
          <RouterLink :to="{ path: '/user/changeUserInfo' }"
            class="hover:*:-translate-y-1 hover:*:drop-shadow-md *:transition-all"><span>个人信息更改</span></RouterLink>
        </li>
        <li>
          <RouterLink :to="{ path: '/user/submitMemberInfo' }"
            class="hover:*:-translate-y-1 hover:*:drop-shadow-md *:transition-all"><span>提交成员信息</span></RouterLink>
        </li>
        <li>
          <RouterLink :to="{ path: '/user/submitWorksInfo' }"
            class="hover:*:-translate-y-1 hover:*:drop-shadow-md *:transition-all"><span>提交作品信息</span></RouterLink>
        </li>
      </ul>
      <RouterView v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </RouterView>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router/router';
import { onActivated, onBeforeUnmount, onMounted, ref } from 'vue';
import { emitter } from '@/utils/emitter';

onActivated(() => {
  router.push('/user/changeUserInfo')
})

onMounted(() => {
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

const container = ref()
</script>

<style lang="scss" scoped></style>