<template>
  <div>
    <!-- //方案1 -->
    <div class="flex flex-col sm:hidden w-full ">
      <div class="pb-5">
        <div class="flex gap-2">
          <slot name="avatar"></slot>
          <div class="flex flex-col w-full gap-2">
            <slot name="name"></slot>
            <div class="flex justify-between">
              <slot name="date"></slot>
              <button class="hover:text-red-500 text-neutral-400 text-sm" :class="{ 'hidden': userID !== userStore.id }"
                @click="showConfirmDialog=true">删除</button>
            </div>
          </div>
        </div>
      </div>
      <slot name="content"></slot>
    </div>
    <!-- //方案2 -->
    <div class="hidden sm:flex  items-center w-full gap-5">
      <div class="shrink-0 self-start">
        <slot name="avatar" class=""></slot>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <slot name="name"></slot>
        <slot name="content"></slot>
        <div class="flex justify-between text-neutral-400 text-sm">
          <slot name="date"></slot>
          <button class="hover:text-red-500" :class="{ 'hidden': userID !== userStore.id }"
            @click="showConfirmDialog=true">删除</button>
        </div>
      </div>
    </div>
    <!-- confirm delete comment and reply dialog -->
    <el-dialog v-model="showConfirmDialog" title="确认删除？" class="w-[16rem] flex flex-col items-center">
      <div class="flex justify-center">
        <div class="flex gap-5">
          <button @click="showConfirmDialog = false"
            class="self-center text-white p-2 px-8 bg-red-500 active:bg-red-700 active:disabled:bg-red-500/50 disabled:bg-red-500/50 rounded-md hover:shadow-md disabled:hover:shadow-none hover:-translate-y-1 transition-all cursor-pointer disabled:hover:translate-y-0">否</button>
          <button @click="deleteReply"
            class="self-center text-white p-2 px-8 bg-red-500 active:bg-red-700 active:disabled:bg-red-500/50 disabled:bg-red-500/50 rounded-md hover:shadow-md disabled:hover:shadow-none hover:-translate-y-1 transition-all cursor-pointer disabled:hover:translate-y-0">是</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reqDeleteReply } from '@/api/comment';
import { useUserStore } from '@/store/user';
import { emitter } from '@/utils/emitter';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const userStore = useUserStore()
const { userID, replyID, commentID } = defineProps<{ userID: string, replyID: string, commentID: string }>()
const showConfirmDialog = ref(false)

async function deleteReply() {
  try {
    await reqDeleteReply(commentID, replyID)
    showConfirmDialog.value = false
    emitter.emit('getComments')
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
  } catch { }
}
</script>

<style lang="scss" scoped></style>