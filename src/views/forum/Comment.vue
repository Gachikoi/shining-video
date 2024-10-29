<template>
  <div class="flex flex-col">
    <div class="flex w-full gap-5">
      <div class="shrink-0">
        <slot name="avatar"></slot>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <slot name="name"></slot>
        <slot name="content"></slot>
        <div class="flex justify-between text-neutral-400 text-sm">
          <div class="flex gap-3">
            <slot name="date"></slot>
            <button class="hover:text-red-500" @click="showMyReply = !showMyReply, scrollToMyReply()">回复</button>
          </div>
          <button :class="{ 'hidden': userID !== userStore.id }" class="hover:text-red-500"
            @click="showConfirmDialog = true">删除</button>
          <!-- confirm delete comment and reply dialog -->
          <el-dialog v-model="showConfirmDialog" title="确认删除？" class="w-[16rem] flex flex-col items-center">
            <div class="flex justify-center">
              <div class="flex gap-5">
                <button @click="showConfirmDialog = false"
                  class="self-center text-white p-2 px-8 bg-red-500 active:bg-red-700 active:disabled:bg-red-500/50 disabled:bg-red-500/50 rounded-md hover:shadow-md disabled:hover:shadow-none hover:-translate-y-1 transition-all cursor-pointer disabled:hover:translate-y-0">否</button>
                <button @click="deleteComment"
                  class="self-center text-white p-2 px-8 bg-red-500 active:bg-red-700 active:disabled:bg-red-500/50 disabled:bg-red-500/50 rounded-md hover:shadow-md disabled:hover:shadow-none hover:-translate-y-1 transition-all cursor-pointer disabled:hover:translate-y-0">是</button>
              </div>
            </div>
          </el-dialog>
        </div>
        <!-- 这里根据不同情况，采用了两个包含部分重叠对象的数组分别进行遍历。这种操作不会使vue丢弃现有的dom并重新渲染整个列表，因此仍然是一种高效的操作 -->
        <Reply v-for="{ id, date, user: { avatarPath, name, id: userID }, content } in renderReplies" :commentID
          :replyID="id" :key="id" :userID class="mt-5 md:mt-8">
          <template #avatar>
            <img class="w-12 md:w-16 h-12 md:h-16 rounded-full" :src="serverURL + avatarPath" alt="">
          </template>
          <template #name>
            <span class="font-semibold">{{ name }}</span>
          </template>
          <template #content>
            <p class="break-all whitespace-pre-wrap hyphens-auto">{{ content }}</p>
          </template>
          <template #date>
            <p class="break-all whitespace-pre-wrap hyphens-auto text-neutral-400 text-sm">{{ new
              Date(date).toLocaleString() }}</p>
          </template>
        </Reply>
        <Reply v-for="{ content, date, id } in myPostReplies" :key="id" :commentID :replyID="id" :userID="userStore.id"
          class="mt-5 md:mt-8">
          <template #avatar>
            <img class="w-12 md:w-16 h-12 md:h-16 rounded-full" :src="serverURL + userStore.avatarPath" alt="">
          </template>
          <template #name>
            <span class="font-semibold">{{ userStore.name }}</span>
          </template>
          <template #content>
            <p class="break-all whitespace-pre-wrap hyphens-auto">{{ content }}</p>
          </template>
          <template #date>
            <p class="break-all whitespace-pre-wrap hyphens-auto text-neutral-400 text-sm">{{ new
              Date(date).toLocaleString() }}</p>
          </template>
        </Reply>
        <button @click="[showAllReplies = true, showRetractButton = true]"
          class="self-start text-neutral-400 mt-2 hover:text-red-500"
          :class="{ 'hidden': showAllReplies || replies.length == 0 }">共{{
            replies.length + myPostReplies.length }}条回复，点击查看</button>
        <button @click="[showAllReplies = false, showRetractButton = false]"
          class="self-start text-neutral-400 mt-2 hover:text-red-500"
          :class="{ 'hidden': !showRetractButton }">收起</button>
        <!-- 回复评论模块 -->
        <div class="items-center w-full gap-5 mt-5" :class="{ 'flex': showMyReply, 'hidden': !showMyReply }">
          <div class="shrink-0">
            <img class="w-12 lg:w-16 h-12 lg:h-16 rounded-full" :src="serverURL + userStore.avatarPath" alt="">
          </div>
          <!-- 这里如果用w-full，上方的图片会被挤压（flex布局被挤压），我们必须为它加上shrink-0来避免挤压。或者这里可以换成grow -->
          <div class="flex flex-col gap-2 w-full" ref="myReplyWrapperRef">
            <textarea placeholder="点击输入评论" name="my-comment" ref="myReplyRef" v-model="myReply" rows="2"
              class=" resize-none outline-none border border-red-500 caret-red-500 rounded-md px-2 py-2 placeholder:text-neutral-400"></textarea>
            <!-- 如果button不加self-end, 它就会自动占满整个父容器的宽度 -->
            <div class="flex justify-between">
              <span :class="{ 'text-red-500': ifExceedWordCountLimit, 'text-neutral-400': !ifExceedWordCountLimit }">{{
                myReply.length }} / 2000字</span>
              <button @click="sendReply"
                class="inline-block bg-red-500 text-white rounded-md p-1 px-6 hover:-translate-y-1 hover:shadow-md transition-all disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:bg-red-500/50 disabled:active:bg-red-500/50 active:bg-red-700"
                ref="submitRef">发送</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { serverURL } from '@/api/config';
import Reply from './Reply.vue';
import { computed, ref, watchPostEffect, nextTick, watch } from 'vue'
import type { ReplyArr } from '@/api/forum';
import { useUserStore } from '@/store/user';
import { ElMessage } from 'element-plus';
import { reqPostReply } from '@/api/forum';
import { nanoid } from 'nanoid';
import { reqDeleteComment } from '@/api/forum';
import { emitter } from '@/utils/emitter';

const showConfirmDialog = ref(false)

async function deleteComment() {
  try {
    await reqDeleteComment(commentID)
    showConfirmDialog.value = false
    emitter.emit('getComments')
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
  } catch { }
}
//vue3.5及以上版本中，直接解构defineprops不会丢失响应式
const { replies = [], commentID, userID } = defineProps<{ replies?: ReplyArr, commentID: string, userID: string }>()
//下面这种方法无法保持replies的响应式
// const partialReplies = replies.slice(0, 2)
//如果想要保持响应式需要用到计算属性
const partialReplies = computed(() => replies.slice(0, 2))
const showAllReplies = ref(replies.length > 2 ? false : true)
const showRetractButton = ref(false)
//如果不解包partialReplies，那么将这个三元表达式直接放在vfor中就好使，放在计算属性中就不好使。
//因为在模版中计算属性会自动解包，三元表达式返回值一致；而setup中不会自动解包，返回值不一致。
const renderReplies = computed(() => showAllReplies.value ? replies : partialReplies.value)

const userStore = useUserStore()
const myReply = ref('')
const myReplyRef = ref()
const myReplyWrapperRef = ref()
const submitRef = ref()
const ifExceedWordCountLimit = ref()
const myPostReplies = ref<myPostReply[]>([])
const showMyReply = ref(false)

interface myPostReply {
  content: string,
  date: number,
  id: string
}

//这里需要理解vue dom更新时机：DOM 的更新并不是同步的。相反，Vue 将缓冲它们直到更新周期的 “下个时机” 以确保无论你进行了多少次声明更改，每个组件都只需要更新一次。
//在这个函数中的体现就是——所有的dom更新会在一段代码的最后执行。虽然这里没在函数内部更改showMyReply的值，但是我们在button被click的时候，
//先调用showMyReply = !showMyReply，再调用scrollToMyReply()，他们都在“一个时机”内，所以此函数内部dom并没有更新，也就是myReplyRef仍处于卸载状态。
async function scrollToMyReply() {
  if (showMyReply.value) {
    //必须先调用nextTick等待dom更新、myReplyRef挂载后再进行scrollIntoView的函数调用。
    await nextTick()
    myReplyWrapperRef.value.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    })
  }
}

async function sendReply() {
  if (myReply.value.length === 0 || myReply.value.trim() === '') {
    ElMessage({
      type: 'warning',
      message: '提交内容不能为空'
    })
    return
  } else {
    try {
      const date = Date.now()
      const id = nanoid()
      await reqPostReply({ content: myReply.value, date, commentID, id })
      myPostReplies.value.push({ content: myReply.value, date, id })
      myReply.value = ''
      ElMessage({
        type: 'success',
        message: '回复成功'
      })
    } catch { }
  }
}

watchPostEffect(() => {
  if (myReply.value.length >= 2000) {
    submitRef.value.disabled = true
    ifExceedWordCountLimit.value = true
  } else {
    submitRef.value.disabled = false
    ifExceedWordCountLimit.value = false
  }
})

defineExpose({ myPostReplies })
</script>

<style lang="scss" scoped></style>