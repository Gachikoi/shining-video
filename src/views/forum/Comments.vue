<template>
  <div class="flex flex-col-reverse w-full divide-y divide-y-reverse">
    <Comment v-for="{id,date, user: { avatarPath, name }, content, replies } in comments" :key="id" :replies :commentID="id" class="py-10">
      <template #avatar>
        <img class="w-16 md:w-20 h-16 md:h-20 rounded-full" :src="serverURL + avatarPath" alt="">
      </template>
      <template #name>
        <span class="font-semibold">{{ name }}</span>
      </template>
      <template #content>
        <p class="break-all whitespace-pre-wrap hyphens-auto">{{ content }}</p>
      </template>
      <template #date>
        <p class="break-all whitespace-pre-wrap hyphens-auto">{{ new Date(date).toLocaleString() }}</p>
      </template>
    </Comment>
    <Comment v-for="{content,date,id} in myPostComments" :key="id" :commentID="id"  class="py-10">
      <template #avatar>
        <img class="w-16 md:w-20 h-16 md:h-20 rounded-full" :src="serverURL+userStore.avatarPath" alt="">
      </template>
      <template #name>
        <span class="font-semibold">{{ userStore.name }}</span>
      </template>
      <template #content>
        <p class="break-all whitespace-pre-wrap hyphens-auto">{{ content }}</p>
      </template>
      <template #date>
        <p class="break-all whitespace-pre-wrap hyphens-auto">{{ new Date(date).toLocaleString() }}</p>
      </template>]
    </Comment>
  </div>
</template>

<script lang="ts" setup>
import Comment from './Comment.vue';
import { reqGetComments } from '@/api/comment';
import { inject } from 'vue';
import { key } from './Forum.vue'
import { useUserStore } from '@/store/user';
import { serverURL } from '@/api/config';

const userStore=useUserStore()
const { data } = await reqGetComments()
const comments = data
console.log(comments);

const myPostComments = inject(key)
</script>

<style lang="scss" scoped>

</style>