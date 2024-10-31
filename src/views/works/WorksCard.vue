<template>
  <div class="flex flex-col sm:flex-row border border-neutral-200 bg-neutral-50/50 rounded-md p-5 gap-5">
    <div class="flex flex-col justify-center items-center gap-2 shrink-0">
      <img class="w-16 sm:w-24 lg:w-28 h-16 sm:h-24 lg:h-28 rounded-full" :src="serverURL+works.avatarPath">
      <span>{{works.name}}</span>
      <button @click="isEditing = !isEditing" :class="{ 'hidden': !editable }"
        class="text-white bg-red-500 p-2 px-4 active:bg-red-700 active:disabled:bg-red-500/50 disabled:bg-red-500/50 rounded-md hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">{{
          editButtonText }}</button>
    </div>
    <div class="flex flex-col min-w-0 gap-5 *:rounded-md *:bg-white *:border *:border-neutral-200">
      <!-- 视频作品 -->
      <div class="relative">
        <div class=" overflow-x-auto flex *:shrink-0 gap-5 p-5 snap-x *:snap-center sm:*:snap-start sm:*:scroll-ml-5">
          <a v-for="({ title, path, link, id }, index) in works.videos" :href="link" target="_blank"
            :key="id"
            class="relative w-56  hover:text-red-500 active:text-red-500 hover:-translate-y-1 transition-all ">
            <img :loading="loading(index)" class="rounded-xl mb-2 after:content-['x'] after:ml-5"
              :src="serverURL + path" alt="">
            <p class="text-center text-pretty">{{ title }}</p>
            <svg @click="deleteVideos" :class="{ 'hidden': !editable || !isEditing }"
              class="absolute top-1 right-1 hover:-translate-y-0.5 transition-all" xmlns="http://www.w3.org/2000/svg"
              x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
              <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z">
              </path>
              <path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path>
              <path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
            </svg>
          </a>
          <svg @click="addVideos" :class="{ 'hidden': !editable || !isEditing }"
            class="absolute top-1 right-1 hover:-translate-y-0.5 transition-all cursor-pointer"
            xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
            <path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
            <path fill="#fff" d="M21,14h6v20h-6V14z"></path>
            <path fill="#fff" d="M14,21h20v6H14V21z"></path>
          </svg>
        </div>
      </div>
      <!-- 排版作品 -->
      <div class="relative">
        <div class=" overflow-x-auto flex flex-col sm:flex-row *:shrink-0 gap-5 h-[30rem] sm:h-72 md:h-80 lg:h-96 p-5">
          <a class="relative" v-for="({ path, id }, index) in works.typesettings"
            :href="serverURL + path" target="_blank" :key="id">
            <img :loading="loading(index)" class="h-full" style="box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);"
              :src="serverURL + path" alt="">
            <svg @click="deleteTypesetting" :class="{ 'hidden': !editable || !isEditing }"
              class="absolute top-1 right-1 hover:-translate-y-0.5 transition-all" xmlns="http://www.w3.org/2000/svg"
              x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
              <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z">
              </path>
              <path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path>
              <path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
            </svg>
          </a>
          <svg @click="addTypeSettings" :class="{ 'hidden': !editable || !isEditing }"
            class="absolute top-1 right-1 hover:-translate-y-0.5 transition-all cursor-pointer"
            xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
            <path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
            <path fill="#fff" d="M21,14h6v20h-6V14z"></path>
            <path fill="#fff" d="M14,21h20v6H14V21z"></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { serverURL } from '@/api/config';
import { computed, ref } from 'vue';
import { useRefHistory } from '@vueuse/core';
import { reqGetWorksInfo, type Works } from '@/api/works';


const { editable = false,works } = defineProps<{ editable?: boolean,works:Works }>()
const isEditing = ref(false)
const editButtonText = computed(() => isEditing.value ? '确认' : '编辑')

function loading(index: number): 'lazy' | 'eager' {
  //从第六个作品开始实行懒加载
  if (index > 4) {
    return 'lazy'
  } else {
    return 'eager'
  }
}

async function getWorks() {
  try {
    await reqGetWorksInfo()
  } catch { }
}
function deleteVideos(e: Event) {
  e.preventDefault()
}

function deleteTypesetting(e: Event) {
  //下面语句会停止事件冒泡，a的click事件不会被触发，但是a的默认跳转行为依旧在
  // e.stopPropagation()
  //这阻止且仅阻止了在点击svg时a的默认跳转行为
  e.preventDefault()
}

function addVideos() {

}

function addTypeSettings() {

}
</script>

<style lang="scss" scoped></style>