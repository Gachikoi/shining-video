<template>
  <div class="flex flex-col sm:flex-row border border-neutral-200 bg-neutral-50/50 rounded-md p-5 gap-5">
    <div class="flex flex-col justify-center items-center gap-2 shrink-0">
      <img class="w-16 sm:w-24 lg:w-28 h-16 sm:h-24 lg:h-28 rounded-full" :src="serverURL + works.avatarPath">
      <span>{{ works.name }}</span>
      <div class="flex flex-row sm:flex-col gap-2">
        <button @click="submitWorksInfo()" :class="{ 'hidden': !editable || !isEditing }"
          class="text-white bg-red-500 p-2 px-4 active:bg-red-700 active:disabled:bg-red-500/50 disabled:bg-red-500/50 rounded-md hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">提交</button>
        <button @click="isEditing = true" :class="{ 'hidden': !editable || isEditing }"
          class="text-white bg-red-500 p-2 px-4 active:bg-red-700 active:disabled:bg-red-500/50 disabled:bg-red-500/50 rounded-md hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">编辑</button>
        <button @click="isEditing = !isEditing, cancelEdit()" :class="{ 'hidden': !isEditing }"
          class="text-white bg-red-500 p-2 px-4 active:bg-red-700 active:disabled:bg-red-500/50 disabled:bg-red-500/50 rounded-md hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">取消</button>
        <button :disabled="!canUndo" @click="undo" :class="{ 'hidden': !editable || !isEditing }"
          class="text-white bg-red-500 p-2 px-4 active:bg-red-700 active:disabled:bg-red-500/50 disabled:bg-red-500/50 rounded-md hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer disabled:hover:translate-y-0 disabled:hover:shadow-none">撤销</button>
        <button :disabled="!canRedo" @click="redo" :class="{ 'hidden': !editable || !isEditing }"
          class="text-white bg-red-500 p-2 px-4 active:bg-red-700 active:disabled:bg-red-500/50 disabled:bg-red-500/50 rounded-md hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer disabled:hover:translate-y-0 disabled:hover:shadow-none">重做</button>
      </div>
    </div>
    <div class="flex flex-col min-w-0 w-full gap-5 *:rounded-md *:bg-white *:border *:border-neutral-200">
      <!-- 视频作品 -->
      <div class="relative w-full">
        <div
          class="overflow-x-auto w-full min-h-36 flex *:shrink-0 gap-5 p-5 snap-x *:snap-center sm:*:snap-start sm:*:scroll-ml-5">
          <a v-for="({ title, path, link, id }, index) in works.videos" :href="link" target="_blank" :key="id"
            class="relative w-56  hover:text-red-500 active:text-red-500 hover:-translate-y-1 transition-all ">
            <!-- 展示服务器数据图片 -->
            <img :loading="loading(index)" class="rounded-xl mb-2" :src="serverURL + path" alt="">
            <!-- 展示本地数据图片 -->
            <img class="rounded-xl mb-2" :class="{ 'hidden': !editable }" :src="path" alt="">
            <p class="text-center text-pretty">{{ title }}</p>
            <!-- 删除按键 -->
            <svg @click="deleteVideo($event, id)" :class="{ 'hidden': !editable || !isEditing }"
              class="absolute top-1 right-1 hover:-translate-y-0.5 transition-all" xmlns="http://www.w3.org/2000/svg"
              x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
              <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z">
              </path>
              <path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path>
              <path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
            </svg>
          </a>
          <!-- 添加按键 -->
          <svg @click="showSubmitVideoDialog = true" :class="{ 'hidden': !editable || !isEditing }"
            class="absolute top-1 right-1 hover:-translate-y-0.5 transition-all cursor-pointer"
            xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
            <path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
            <path fill="#fff" d="M21,14h6v20h-6V14z"></path>
            <path fill="#fff" d="M14,21h20v6H14V21z"></path>
          </svg>
          <!-- submit video dialog -->
          <el-dialog v-model="showSubmitVideoDialog" title="提交视频作品" class="w-[20rem] flex flex-col items-center">
            <div class="flex flex-col items-center">
              <div class="flex flex-col items-center gap-5">
                <div class="flex justify-between items-center w-full"><span class="text-nowrap">视频封面：</span>
                  <input
                    class="min-w-0 w-full file:mr-4 file:rounded-lg file:bg-red-500 file:border-none file:text-white file:p-2 file:hover:bg-red-600 file:transition-all"
                    type="file" ref="fileVideoCoverRef">
                </div>
                <div class="flex justify-between items-center w-full"><span class="text-nowrap">视频标题：</span>
                  <input class="w-full px-2 border border-neutral-400 rounded-md" type="text"
                    v-model="submitVideoForm.title">
                </div>
                <div class="flex justify-between items-center w-full"><span class="text-nowrap">视频链接：</span>
                  <input class="w-full px-2 border border-neutral-400 rounded-md" type="text"
                    v-model="submitVideoForm.link">
                </div>
              </div>
              <button class="mt-5 mx-auto rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm p-2 px-5"
                @click="addVideo()">提交</button>
            </div>
          </el-dialog>
        </div>
      </div>
      <!-- 排版作品 -->
      <div class="relative">
        <div class=" overflow-x-auto flex flex-col sm:flex-row *:shrink-0 gap-5 h-[30rem] sm:h-72 md:h-80 lg:h-96 p-5">
          <a class="relative" v-for="({ path, id }, index) in works.typesettings" :href="truePath(index,path)"
            target="_blank" :key="id">
            <!-- 展示服务器数据中的图片 -->
            <img :loading="loading(index)" class="h-full"
              :class="{ 'hidden': index >= immutableWorks.typesettings.length }"
              style="box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);" :src="serverURL + path" alt="">
            <!-- 展示本地数据中的图片 -->
            <img class="h-full" :class="{ 'hidden': !editable || index < immutableWorks.typesettings.length }"
              :src="path" alt="">
            <!-- 删除按键 -->
            <svg @click="deleteTypesetting($event, id)" :class="{ 'hidden': !editable || !isEditing }"
              class="absolute top-1 right-1 hover:-translate-y-0.5 transition-all" xmlns="http://www.w3.org/2000/svg"
              x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
              <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z">
              </path>
              <path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path>
              <path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
            </svg>
          </a>
          <!-- 添加按键 -->
          <svg @click="showSubmitTypesettingDialog = true" :class="{ 'hidden': !editable || !isEditing }"
            class="absolute top-1 right-1 hover:-translate-y-0.5 transition-all cursor-pointer"
            xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
            <path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
            <path fill="#fff" d="M21,14h6v20h-6V14z"></path>
            <path fill="#fff" d="M14,21h20v6H14V21z"></path>
          </svg>
          <!-- submit typesetting dialog -->
          <el-dialog v-model="showSubmitTypesettingDialog" title="提交排版作品" class="w-[20rem] flex flex-col items-center">
            <div class="flex flex-col items-center">
              <div class="flex justify-between items-center w-full">
                <span class="text-nowrap">上传：</span>
                <input
                  class="min-w-0 w-full file:mr-4 file:rounded-lg file:bg-red-500 file:border-none file:text-white file:p-2 file:hover:bg-red-600 file:transition-all"
                  type="file" multiple ref="fileTypesettingsRef">
              </div>
              <button class="mt-5 mx-auto rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm p-2 px-5"
                @click="addTypeSettings()">提交</button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const userStore = useUserStore()
const worksDefault: Works = { name: userStore.name, avatarPath: userStore.avatarPath, videos: [], typesettings: [] }
</script>

<script lang="ts" setup>
import { serverURL } from '@/api/config';
import { computed, onBeforeUnmount, ref } from 'vue';
import { useRefHistory } from '@vueuse/core';
import { type Works } from '@/api/works';
import { useUserStore } from '@/store/user';
import { ElLoading, ElMessage } from 'element-plus';
import { reqSubmitWorksInfo } from '@/api/user';
import { nanoid } from 'nanoid';
import { useWorksStore } from '@/store/works';

//不能将setup中的本地变量赋值给defineProps的默认值
const { editable = false, works: immutableWorks = worksDefault } = defineProps<{ editable?: boolean, works?: Works }>()
const mutableWorks = ref<Works>(JSON.parse(JSON.stringify(immutableWorks)))
const { history: undoableMutableWorks, undo, redo, canRedo, canUndo, undoStack, redoStack } = useRefHistory(mutableWorks, { deep: true, capacity: 20 })
const works = computed(() => editable ? undoableMutableWorks.value[0].snapshot : immutableWorks)
const isEditing = ref(false)
const showSubmitVideoDialog = ref(false)
const showSubmitTypesettingDialog = ref(false)
const fileVideoCoverRef = ref()
const fileTypesettingsRef = ref()
const submitVideoForm = ref({
  title: '',
  link: ''
})
const worksStore = useWorksStore()
let createdURLs: Array<string> = []

onBeforeUnmount(() => {
  //卸载时记得销毁URL。由于卸载后createdURL也被销毁，所以不需要手动清空createdURL
  createdURLs.forEach((url) => {
    URL.revokeObjectURL(url)
  })
})

function truePath(index:number,path:string):string {
  return index < immutableWorks.typesettings.length ? serverURL + path : path
}

function loading(index: number): 'lazy' | 'eager' {
  //从第六个作品开始实行懒加载
  if (index > 4) {
    return 'lazy'
  } else {
    return 'eager'
  }
}

function cancelEdit() {
  //取消时不仅需要销毁url（因为他们不再被展示）
  createdURLs.forEach((url) => {
    URL.revokeObjectURL(url)
  })
  //而且要讲此数组清空，表明已经没有被建立的url了
  createdURLs = []
  //如果可以撤销/重做，说明mutableworks发生了改变，此时我们应该在取消编辑的同时将它恢复为初始状态。
  if (canUndo.value || canRedo.value) {
    // 利用历史记录找到初始状态
    mutableWorks.value = undoableMutableWorks.value[undoableMutableWorks.value.length - 1].snapshot
    // 因为将mutableworks的初始状态赋值给mutableworks，改变了它的值，所以又触发了history的记录，所以撤销一下记录的历史。
    undo()
    //清空undo、redo栈
    undoStack.value = []
    redoStack.value = []
    //这样就实现了在恢复mutableWorks的初始状态的同时清空历史记录了
  }
}

function deleteVideo(e: Event, id: string) {
  e.preventDefault()
  let videoIndex = -1
  mutableWorks.value.videos.find((video, index) => {
    videoIndex = index
    return video.id === id
  })
  if (videoIndex != -1) {
    mutableWorks.value.videos.splice(videoIndex, 1)
  }
}

function deleteTypesetting(e: Event, id: string) {
  //下面语句会停止事件冒泡，a的click事件不会被触发，但是a的默认跳转行为依旧在
  // e.stopPropagation()
  //这阻止且仅阻止了在点击svg时a的默认跳转行为
  e.preventDefault()
  let typesettingIndex = -1
  mutableWorks.value.typesettings.find((typesetting, index) => {
    typesettingIndex = index
    return typesetting.id === id
  })
  if (typesettingIndex != -1) {
    mutableWorks.value.typesettings.splice(typesettingIndex, 1)
  }
}

function addVideo() {
  if (!fileVideoCoverRef.value.files[0]) {
    ElMessage({
      type: 'error',
      message: '请上传视频封面'
    })
    return
  }
  if (fileVideoCoverRef.value.files[0].size > 1024 * 1024) {
    ElMessage({
      type: 'error',
      message: '封面大小不能超过1M'
    })
    return
  }
  if (submitVideoForm.value.title == '') {
    ElMessage({
      type: 'error',
      message: '请添加标题'
    })
    return
  }
  if (submitVideoForm.value.link == '') {
    ElMessage({
      type: 'error',
      message: '请添加视频链接'
    })
    return
  }
  const url = URL.createObjectURL(fileVideoCoverRef.value.files[0])
  createdURLs.push(url)
  mutableWorks.value.videos.push({ path: url, link: submitVideoForm.value.link, title: submitVideoForm.value.title, id: nanoid() })
  showSubmitVideoDialog.value = false
  // files为只读属性，不能更改
  fileVideoCoverRef.value.value = ''
  submitVideoForm.value.title = ''
  submitVideoForm.value.link = ''
}

function addTypeSettings() {
  if (!fileTypesettingsRef.value.files[0]) {
    ElMessage({
      type: 'error',
      message: '请上传作品'
    })
    return
  }
  if (fileTypesettingsRef.value.files[0].size > 2 * 1024 * 1024) {
    ElMessage({
      type: 'error',
      message: '作品大小不能超过2M'
    })
    return
  }
  for (const file of fileTypesettingsRef.value.files) {
    const url = URL.createObjectURL(file)
    createdURLs.push(url)
    mutableWorks.value.typesettings.push({ path: url, id: nanoid() })
  }
  showSubmitTypesettingDialog.value = false
  fileTypesettingsRef.value.value = ''
}

async function submitWorksInfo() {
  console.log(mutableWorks.value.videos);
  
  if (mutableWorks.value.videos.length == 0 && mutableWorks.value.typesettings.length == 0) {
    ElMessage({
      type: 'error',
      message: '作品不能为空'
    })
    return
  }
  if (!canUndo.value && !canRedo.value) {

  }
  const formData = new FormData()
  for (const video of mutableWorks.value.videos) {
    const blob = await fetch(video.path).then(res => res.blob()).catch(err => console.log(err))
    if (blob) {
      const cover = new File([blob], 'file', { type: blob.type })
      formData.append('videoCovers', cover)
      formData.append('videoIDs', video.id)
      formData.append('videoLinks', video.link)
      formData.append('videoTitles', video.title)
    }
  }
  for (const typesetting of mutableWorks.value.typesettings) {
    const blob = await fetch(typesetting.path).then(res => res.blob()).catch(err => console.log(err))
    if (blob) {
      const img = new File([blob], 'file', { type: blob.type })
      formData.append('typesettingImgs', img)
      formData.append('typesettingIDs', typesetting.id)
    }
  }
  let loadingInstance
  try {
    loadingInstance = ElLoading.service()
    await reqSubmitWorksInfo(formData)
    loadingInstance.close()
    await worksStore.getWorksInfo()
    //当编辑成功后，会重新获取works数据，url不再被需要，所以也要清空url
    createdURLs.forEach((url) => {
      URL.revokeObjectURL(url)
    })
    createdURLs = []
    isEditing.value = false
    ElMessage({
      type: 'success',
      message: '编辑成功'
    })
  } catch {
    loadingInstance?.close()
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-dialog__header) {
  padding-right: 0;

  span {
    font-size: medium
  }
}
</style>