<template>
  <div class="flex flex-col-reverse w-full divide-y divide-y-reverse">
    <Comment ref="commentRefs"
      v-for="{ id, date, user: { avatarPath, name, id: userID }, content, replies } in comments" :key="id" :replies
      :commentID="id" :userID class="py-10">
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
    <Comment ref="myPostCommentRefs" v-for="{ content, date, id } in myPostComments" :key="id" :commentID="id"
      :userID="userStore.id" class="py-10">
      <template #avatar>
        <img class="w-16 md:w-20 h-16 md:h-20 rounded-full" :src="serverURL + userStore.avatarPath" alt="">
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
import { reqGetComments } from '@/api/forum';
import { inject, onBeforeMount, onMounted, useTemplateRef } from 'vue';
import { key } from './Forum.vue'
import { useUserStore } from '@/store/user';
import { serverURL } from '@/api/config';
import { emitter } from '@/utils/emitter';
import { ref } from 'vue';
import { type CommentArr } from '@/api/forum';
import { type ComponentPublicInstance } from 'vue';
import { nextTick } from 'vue';

const userStore = useUserStore()
//不这样声明ref的类型，commentRef的类型就会为never
type CommentInstance = ComponentPublicInstance<typeof Comment>
const commentRefs = ref<CommentInstance[]>([])
const myPostCommentRefs = ref<CommentInstance[]>([])

//mitt最佳实践：在组件挂载后订阅事件，组件被销毁后退订事件。否则在组件重新挂载后，当事件触发时，回调函数内的语句将被执行两次。
onMounted(() => {
  emitter.on('loadForum', async () => {
    try {
      console.log(1);
      const result = await reqGetComments()
      data.value = result.data
    } catch { }
  })

  emitter.on('getComments', async () => {
    try {
      const result = await reqGetComments()
      data.value = result.data
      if (myPostComments?.value) {
        myPostComments.value = []
      }
      await nextTick()
      for (const commentRef of commentRefs.value) {
        //注意，这里commentRef和myPostReplies不用再解包了，因为ref内部嵌套的对象会被自动解包
        //而且我们安装了插件后，但凡需要.value解包的，系统都会自动提示。
        commentRef.myPostReplies = []
      }
      for (const myPostCommentRef of myPostCommentRefs.value) {
        myPostCommentRef.myPostReplies = []
      }
    } catch { }
  })
})

onBeforeMount(() => {
  emitter.off('loadForum')
  emitter.off('getComments')
})

let data = ref<CommentArr>()

const comments = data

const myPostComments = inject(key)
</script>

<style lang="scss" scoped></style>