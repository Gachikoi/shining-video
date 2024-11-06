<template>
  <div class="flex justify-center">
    <div class="flex flex-col items-center space-y-10">
      <!-- top -->
      <div class="px-6 flex flex-col items-center w-screen max-w-screen-xl">
        <h1 class="pb-2 border-b-4 border-red-500">关于我们</h1>
        <p class="mt-6 max-w-screen-md tracking-wider leading-relaxed mb-6 text-center text-pretty">
          晒你动漫社视频组官网旨在展示组内文化、作品、活动与历史。
        </p>
        <p class="max-w-screen-md tracking-wider leading-relaxed mb-6 text-center text-pretty">
          此网站于2024年10月12日开始开发，2024年11月2日开发完毕。
        </p>
        <p class="max-w-screen-md tracking-wider leading-relaxed mb-6 text-center text-pretty">项目前端仓库：<a
            href="https://github.com/Gachikoi/shining-video" target="_blank"
            class="underline">https://github.com/Gachikoi/shining-video</a></p>
        <p class="max-w-screen-md tracking-wider leading-relaxed mb-6 text-center text-pretty">项目后端仓库：<a
            href="https://github.com/Gachikoi/shining-video-server" target="_blank"
            class="underline">https://github.com/Gachikoi/shining-video-server</a></p>
        <p class="max-w-screen-md tracking-wider leading-relaxed mb-6 text-center text-pretty">
          视频组相关请联系组长；BUG反馈、网站相关请联系站长。
        </p>
      </div>
      <!-- middle -->
      <div
        class="px-6 md:flex justify-center space-y-10 md:space-y-0 md:space-x-5 w-screen max-w-screen-xl *:space-y-5">
        <!-- left -->
        <div class="basis-1/2 flex flex-col items-center">
          <h1 class=" text-center pb-2 border-b-4 border-red-500">
            视频组官网于2024年建成</h1>
          <div class="flex flex-col-reverse">
            <MemberCard v-for="{ id, path, name, contact, title, bililink } in membersStore.activeDuty" :key="id"
              :item="{ path, name, contact, title, bililink }"></MemberCard>
          </div>
          <h2 class="text-center font-mono text-xl font-bold text-pretty">特别感谢</h2>
          <p class="text-center">暂无</p>
        </div>
        <!-- right -->
        <div class="basis-1/2 flex flex-col items-center">
          <h1 class="text-center pb-2 border-b-4 border-red-500">
            视频组于2017年成立</h1>
          <div class="flex flex-wrap justify-center">
            <MemberCard v-for="{ id, path, name, contact, title, bililink } in membersStore.founder" :key="id"
              :item="{ path, name, contact, title, bililink }"></MemberCard>
          </div>
          <hr class="border-2 w-10/12">
          <div class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            <MemberCard v-for="{ id, path, name, contact, title, bililink } in membersStore.historicalDuty" :key="id"
              :item="{ path, name, contact, title, bililink }"></MemberCard>
          </div>
        </div>
      </div>
      <!-- bottom -->
      <div class="px-6 flex flex-col flex-wrap items-center w-screen max-w-screen-xl space-y-5">
        <h1 class="text-pretty pb-2 border-b-4 border-red-500">视频组组员</h1>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <MemberCard v-for="{ id, path, name, contact, title, bililink } in membersStore.otherMembers" :key="id"
            :item="{ path, name, contact, title, bililink }" loading="lazy"></MemberCard>
        </div>
      </div>
      <!-- link -->
      <div class="px-6 flex flex-col flex-wrap items-center w-screen max-w-screen-xl space-y-5">
        <h1 class="text-pretty pb-2 border-b-4 border-red-500">友情链接</h1>
        <div class="flex flex-col items-center space-y-0">
          <a class="underline text-pretty leading-loose" target="_blank" href="https://madproducer.com/cn/">MAD
            Producer - MAD综合信息平台</a>
          <a class="underline text-pretty leading-loose pt-2" target="_blank" href="https://icons8.com">Icons by
            Icons8</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MemberCard from '@/views/about/MemberCard.vue';
import { useMembersStore } from '@/store/members';

const membersStore = useMembersStore()
membersStore.getActiveDuty()
membersStore.getHistoricalDuty()
membersStore.getFounder()
membersStore.getOtherMembers()
//这种方式仍然会导致——页面停留在lazy元素上时，刷新页面，滚动条位置被还原，viewport在lazy元素上，lazy元素立刻被加载。
//是一种掩耳盗铃的懒加载方式。
//正确的做法是在router中配饰scrollBehavior。其中savedPosition就是刷新前浏览器为我们自动保存的scroll值，我们只需要一律返回0就好。
// onMounted(() => {
// setTimeout(() => {
// document.documentElement.scrollTop = 0;
// }, 0);
// })
</script>

<style lang="scss" scoped></style>