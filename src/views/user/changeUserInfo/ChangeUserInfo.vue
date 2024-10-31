<template>
  <div class="flex flex-col items-center gap-5">
    <h2>个人信息修改</h2>
    <!-- 此处w-full （设定明确的宽度，防止第二个子容器撑开）-->
    <div class="flex justify-center w-full *:flex *:flex-col gap-5 md:gap-8 lg:gap-20">
      <div class="items-center gap-6">
        <div class="relative w-28 md:w-32">
          <img v-if="userStore.isLogin" class="w-28 md:w-32 h-28 md:h-32 rounded-full" :src="serverURL + userStore.avatarPath"
            ref="avatarPreview">
          <span class="absolute bottom-0 left-1/2 translate-y-full -translate-x-1/2 text-red-500 text-sm text-nowrap"
            :class="{ 'hidden': !isTooLarge }">图片需小于1M</span>
        </div>
        <label for="changeAvatar"
          class="text-white p-2 bg-red-500 active:bg-red-700 rounded-md hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">更换头像</label>
        <input hidden type="file" id="changeAvatar" accept="jpg,jpeg,png" ref="changeAvatarRef"
          @change="previewAndAvatarCheck">
      </div>
      <!-- 和这里的min-w-0 （在非滚动容器中，主轴方向Flex Item 的最小尺寸是基于内容的最小尺寸，此时 min-width 的值是 auto，shrink不生效）-->
      <div class="justify-between min-w-0 gap-5 ">
        <div class="flex flex-col *:flex *:flex-row  *:items-center gap-6 *:gap-5 ">
          <div class="relative">
            <span class="text-nowrap">昵称</span>
            <!-- 以及两个input的min-w-0 （input默认min-w-auto，且有默认的最小尺寸，shrink不生效。设置min-w-0使shrink生效） -->
            <input :class="{ 'border-red-500': !isNameValid }" class="peer/name px-4 py-1 border border-black/30 caret-black/30 rounded-md min-w-0" type="text"
              v-model.trim="userInfoForm.name" required ref="nameRef">
            <span
              class="absolute bottom-0 left-[52px] translate-y-full text-red-500 hidden peer-invalid/name:inline-block text-sm">昵称不能为空</span>
          </div>
          <div class="relative">
            <span class="text-nowrap">密码</span>
            <!-- 一个也不能少，否则input将会撑开父容器 -->
            <input :class="{ 'border-red-500': !isPasswordValid}"
              class="peer/password px-4 py-1 border border-black/30 caret-black/30 rounded-md min-w-0 placeholder:text-neutral-400"
              type="password" placeholder="请输入新密码" v-model="userInfoForm.password" minlength="6" maxlength="20"
              ref="passwordRef">
            <span
              class="absolute bottom-0 left-[52px] translate-y-full text-red-500 hidden peer-invalid/password:inline-block text-sm">密码长度为6到20位</span>
          </div>
        </div>
        <button @click="changeUserInfo"
          class="self-center text-white p-2 bg-red-500 active:bg-red-700 active:disabled:bg-red-500/50 disabled:bg-red-500/50 rounded-md hover:shadow-md disabled:hover:shadow-none hover:-translate-y-1 transition-all cursor-pointer disabled:hover:translate-y-0"
          :disabled="isSubmitButtonDisabled">提交更改</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import { serverURL } from '@/api/config';
import {  onBeforeUnmount, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { reqChangeUserInfo } from '@/api/user';
import { watch } from 'vue';
import { emitter } from '@/utils/emitter';

const userStore = useUserStore()
const nameRef = ref()
const changeAvatarRef = ref()
const avatarPreview = ref()
const passwordRef = ref()
const isTooLarge = ref(false)
const isFileChoosed = ref(false)
const isSubmitButtonDisabled = ref(true)
const isNameValid = ref(true)
const isPasswordValid=ref(true)

const userInfoForm = ref({
  password: '',
  name: userStore.name
})

onBeforeUnmount(() => {
  if (avatarPreview.value?.src) {
    URL.revokeObjectURL(avatarPreview.value.src)
  }
  if (userStore.isLogin) {
    avatarPreview.value.src = serverURL + userStore.avatarPath
    userInfoForm.value.name = userStore.name
    userInfoForm.value.password = ''
  }
})



function previewAndAvatarCheck() {
  isFileChoosed.value = true
  if (changeAvatarRef.value.files![0]) {
    const file = changeAvatarRef.value.files![0]
    //因为选择文件很可能不止一次，所以一定要先销毁之前创建的预览url再创建新的预览url，否则之前的预览文件在浏览器关闭前将不会被清除
    //不用担心因为第一次传入的是服务器中图片的url而报错，这个方法会静默失败。
    URL.revokeObjectURL(avatarPreview.value.src)
    avatarPreview.value.src = URL.createObjectURL(file)
    if (file.size > 1024 * 1024) {
      isTooLarge.value = true
    } else {
      isTooLarge.value = false
    }
  }
}

async function changeUserInfo() {
  const file = changeAvatarRef.value.files![0]
  const formData = new FormData()
  if (isFileChoosed.value) {
    formData.append('avatar', file)
  }
  if (userInfoForm.value.name !== userStore.name) {
    formData.append('name', userInfoForm.value.name)
  }
  if (userInfoForm.value.password !== '') {
    formData.append('password', userInfoForm.value.password)
  }
  //我们甚至不用设置content-type，因为axios会自动帮我们设置好
  try {
    const { data } = await reqChangeUserInfo(formData)
    if (data) {
      userStore.avatarPath = data
      changeAvatarRef.value.src = serverURL + userStore.avatarPath
    }
    emitter.emit('loadForum')
    userStore.name = userInfoForm.value.name
    isFileChoosed.value=false
    isSubmitButtonDisabled.value=true
    ElMessage({
      type: 'success',
      message: "修改成功"
    })
  } catch { }
}

watch([userInfoForm, isTooLarge, isFileChoosed], () => {
  if (passwordRef.value.checkValidity()) {
    isPasswordValid.value=true
  } else {
    isPasswordValid.value=false
    return
  }
  if (userInfoForm.value.name !== '') {
    isNameValid.value=true
  } else {
    isNameValid.value=false
    return
  }
  if (!isTooLarge.value  && (isFileChoosed.value || userInfoForm.value.password !== '' || userInfoForm.value.name !== userStore.name)) {
    isSubmitButtonDisabled.value = false
  } else {
    isSubmitButtonDisabled.value = true
  }
}, { deep: true })
</script>

<style lang="scss" scoped></style>