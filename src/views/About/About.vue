<template>
  <div class="flex justify-center">
    <div class="flex flex-col items-center space-y-10">
      <!-- top -->
      <div class="px-6 flex flex-col items-center w-screen max-w-screen-xl *:space-y-5">
        <h1 class="text-2xl pb-2 border-b-4 border-red-500 font-mono font-bold">关于我们</h1>
        <p class="w-1/2 m-6 mb-0 tracking-wide leading-loose text-center">
          晒你动漫社视频组官网旨在展示组内文化、作品、活动与历史。
        </p>
        <p class="w-1/2 m-6 mt-0 tracking-wide leading-relaxed text-center">
          我们希望为视频组成员提供一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个一个
          一个一个一个。
        </p>
      </div>
      <!-- middle -->
      <div
        class="px-6 md:flex justify-center space-y-10 md:space-y-0 md:space-x-5 w-screen max-w-screen-xl *:space-y-5">
        <!-- left -->
        <div class="basis-1/2 flex flex-col items-center">
          <h1 class="font-mono text-2xl font-bold text-center pb-2 border-b-4 border-red-500">
            视频组官网于2024年建成并开始运营</h1>
          <div class="flex flex-col-reverse">
            <Card v-for="{ id, path, name, contact,  title, bililink } in membersStore.activeDuty" :key="id"
              :item="{ path, name, contact, title, bililink }"></Card>
          </div>
          <h2 class="text-center font-mono text-xl font-bold text-pretty">特别感谢</h2>
          <p class="text-center">暂无</p>
        </div>
        <!-- right -->
        <div class="basis-1/2 flex flex-col items-center">
          <h1 class="font-mono text-2xl font-bold text-center pb-2 border-b-4 border-red-500">
            视频组于2017年成立并开始活动</h1>
          <div class="flex flex-wrap justify-center">
            <Card v-for="{ id, path, name, contact, title, bililink } in membersStore.founder" :key="id"
              :item="{ path, name, contact, title, bililink }"></Card>
          </div>
          <hr class="border-2 w-10/12">
          <div class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            <Card v-for="{ id, path, name, contact, title, bililink } in membersStore.historicalDuty" :key="id"
              :item="{ path, name, contact, title, bililink }"></Card>
          </div>
        </div>
      </div>
      <!-- bottom -->
      <div class="px-6 flex flex-col flex-wrap items-center w-screen max-w-screen-xl space-y-5">
        <h1 class="font-mono text-2xl font-bold text-pretty pb-2 border-b-4 border-red-500">视频组组员</h1>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Card v-for="{ id, path, name, contact, title, bililink } in membersStore.otherMembers" :key="id"
            :item="{ path, name, contact, title, bililink }" loading="lazy"></Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Card from '@/components/Card.vue';
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