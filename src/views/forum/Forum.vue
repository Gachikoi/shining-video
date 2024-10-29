<template>
  <div>
    <hr class="border-2 border-red-500 mb-10">
    <div class="flex justify-center">
      <div class="w-screen max-w-screen-xl px-6">
        <div class="flex flex-col items-center">
          <div class="flex items-center w-full gap-5">
            <div class="shrink-0">
              <img v-if="userStore.isLogin" class="w-24 lg:w-28 h-24 lg:h-28 rounded-full" :src="serverURL + userStore.avatarPath" alt="">
            </div>
            <!-- 这里如果用w-full，上方的图片会被挤压（flex布局被挤压），我们必须为它加上shrink-0来避免挤压。或者这里可以换成grow -->
            <div class="flex flex-col gap-2 w-full">
              <textarea placeholder="点击输入评论" name="my-comment" ref="myCommentRef" v-model="myComment" rows="3"
                class=" resize-none outline-none border border-red-500 caret-red-500 rounded-md px-2 py-2 placeholder:text-neutral-400"></textarea>
              <!-- 如果button不加self-end, 它就会自动占满整个父容器的宽度 -->
              <div class="flex justify-between">
                <span
                  :class="{ 'text-red-500': ifExceedWordCountLimit, 'text-neutral-400': !ifExceedWordCountLimit }">{{
                    myComment.length }} / 2000字</span>
                <button @click="sendComment"
                  class="inline-block bg-red-500 text-white rounded-md p-1 px-6 hover:-translate-y-1 hover:shadow-md transition-all disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:bg-red-500/50 disabled:active:bg-red-500/50 active:bg-red-700"
                  ref="submitRef">发送</button>
              </div>
            </div>
          </div>
          <Suspense>
            <Comments></Comments>
          </Suspense>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
//如果这个注入被多个组件使用，建议将注入key的类型放在一个单独的文件中
interface myPostComment {
  content: string,
  date: number
  id: string
}
export const key = Symbol() as InjectionKey<Ref<myPostComment[], myPostComment[]>>
</script>

<script lang="ts" setup>
import { nanoid } from 'nanoid';
import { useUserStore } from '@/store/user';
import { serverURL } from '@/api/config';
import { provide, ref, watchPostEffect, type InjectionKey, type Ref } from 'vue';
import Comments from './Comments.vue';
import { ElMessage } from 'element-plus';
import { reqPostComment } from '@/api/forum';


const userStore = useUserStore()
const myComment = ref('')
const myCommentRef = ref()
const submitRef = ref()
const ifExceedWordCountLimit = ref()
const myPostComments = ref<myPostComment[]>([])

async function sendComment() {
  if (myComment.value.length === 0 || myComment.value.trim() === '') {
    ElMessage({
      type: 'warning',
      message: '提交内容不能为空'
    })
    return
  } else {
    try {
      const date = Date.now()
      const id = nanoid()
      await reqPostComment({ content: myComment.value, date, id })
      myPostComments.value.push({ content: myComment.value, date, id })
      myComment.value = ''
      ElMessage({
        type: 'success',
        message: '评论成功'
      })
    } catch { }
  }
}

watchPostEffect(() => {
    if (myComment.value.length >= 2000) {
      submitRef.value.disabled = true
      ifExceedWordCountLimit.value = true
    } else {
      submitRef.value.disabled = false
      ifExceedWordCountLimit.value = false
    }
})

provide(key, myPostComments)
</script>

<style lang="scss" scoped>
:deep(.el-dialog__header) {
  padding-right: 0;

  span {
    font-size: medium
  }
}
</style>