<template>
  <div>
    <SubmitMemberInfoBanned v-if="!userStore.permission"></SubmitMemberInfoBanned>
    <div v-else class="flex flex-col items-center gap-5">
      <h2>提交成员信息</h2>
      <div class="flex flex-col lg:flex-row justify-center items-center w-full gap-8 lg:gap-20">
        <div class="flex flex-col items-center gap-2">
          <MemberCard
            :item="{ path: userStore.avatarPath, name: userStore.name, contact: memberInfoForum.contact, title: memberInfoForum.title, bililink: memberInfoForum.fullLink }">
          </MemberCard>
          <span class="text-neutral-400">效果预览</span>
        </div>
        <div class="flex flex-col gap-6">
          <div class="relative flex flex-col">
            <span class="text-nowrap">个人简介</span>
            <input :class="{ 'border-red-500': !isTitleValid }"
              class="peer/title px-4 py-1 border border-black/30 caret-black/30 rounded-md min-w-0" type="text"
              maxlength="15" ref="titleRef" v-model.trim="memberInfoForum.title" placeholder="Ciallo～(∠·ω< )⌒★">
            <span
              class="absolute bottom-0 left-0 translate-y-full text-red-500 hidden peer-[.invalid]/title:inline-block text-sm">最大长度为15</span>
          </div>
          <div class="relative flex flex-col">
            <span class="text-nowrap">你的主页链接（b站主页/个人网站）</span>
            <input
              class="px-4 py-1 border border-black/30 caret-black/30 rounded-md min-w-0 placeholder:text-neutral-400"
              placeholder="www.example.com" v-model="link">
          </div>
          <div class="relative flex flex-col">
            <span class="text-nowrap">你的联系方式</span>
            <input :class="{ 'border-red-500': !isContactValid }"
              class="peer/contact px-4 py-1 border border-black/30 caret-black/30 rounded-md min-w-0 placeholder:text-neutral-400"
              ref="contactRef" maxlength="25" placeholder="QQ:1145141919" v-model="memberInfoForum.contact">
            <span
              class="absolute bottom-0 left-0 translate-y-full text-red-500 hidden peer-[.invalid]/contact:inline-block text-sm">最大长度为25</span>
          </div>
        </div>
      </div>
      <button @click="submitMemberInfo"
        class="self-center text-white p-2 px-5 bg-red-500 active:bg-red-700 active:disabled:bg-red-500/50 disabled:bg-red-500/50 rounded-md hover:shadow-md disabled:hover:shadow-none hover:-translate-y-1 transition-all cursor-pointer disabled:hover:translate-y-0">提交</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MemberCard from '@/views/about/MemberCard.vue';
import SubmitMemberInfoBanned from './SubmitMemberInfoBanned.vue';
import { useUserStore } from '@/store/user';
import { computed, nextTick, ref, watch } from 'vue';
import { reqSubmitMemberInfo } from '@/api/user';
import { ElMessage } from 'element-plus';

const userStore = useUserStore()
const link = ref('')
const fullLink = computed(() => {
  if (link.value.slice(0, 4) === 'http') {
    return link.value
  } else if (link.value !== '') {
    return 'http://' + link.value
  } else {
    return ''
  }
})
const memberInfoForum = ref({
  title: '',
  fullLink,
  contact: ''
})
const titleRef = ref()
const contactRef = ref()
const isTitleValid = ref(true)
const isContactValid = ref(true)

async function submitMemberInfo() {
  try {
    await reqSubmitMemberInfo(memberInfoForum.value)
    link.value = ''
    memberInfoForum.value.title = ''
    memberInfoForum.value.contact = ''
    ElMessage({
      type: 'success',
      message: '提交成功'
    })
  } catch { }
}

watch([() => memberInfoForum.value.title, () => memberInfoForum.value.contact], async () => {
  if (memberInfoForum.value.title.length >= 15) {
    isTitleValid.value = false;
    await nextTick();
    (titleRef.value as HTMLElement).classList.add('invalid')
  } else {
    isTitleValid.value = true;
    await nextTick();
    (titleRef.value as HTMLElement).classList.remove('invalid')
  }
  if (memberInfoForum.value.contact.length >= 25) {
    //如果是下面这个写法，就没有办法在触发边框变红的同时给contactRef加上invalid类名
    // (contactRef.value as HTMLElement).classList.add('invalid')
    // isContactValid.value=false
    isContactValid.value = false
    await nextTick();
    (contactRef.value as HTMLElement).classList.add('invalid')
  } else {
    isContactValid.value = true
    await nextTick();
    (contactRef.value as HTMLElement).classList.remove('invalid')
  }
})
</script>

<style lang="scss" scoped></style>