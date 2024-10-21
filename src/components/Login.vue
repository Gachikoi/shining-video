<template>
  <el-dialog v-model="dialogFormVisible" :title="title" class="w-80 sm:w-96 md:w-[32rem]">
    <!-- login -->
    <el-form v-if="!showRegister" :model="loginForm" :rules="rules" ref="loginRef">
      <el-form-item label="邮箱" id="login-email" prop="email">
        <el-input v-model="loginForm.email" placeholder="you@example.com" />
      </el-form-item>
      <el-form-item label="密码" id="login-password" prop="password">
        <el-input v-model="loginForm.password" placeholder="请输入6-20位密码" />
      </el-form-item>
      <div class="dialog-footer ">
        <div class="flex justify-around">
          <el-button type="danger" @click="showRegister = !showRegister" class="w-[10rem]">{{ buttonText }}</el-button>
          <el-button type="danger" @click="login(loginRef)" class="w-[10rem]">
            确认
          </el-button>
        </div>
      </div>
    </el-form>
    <!-- register -->
    <el-form v-if="showRegister" :model="registerForm" :rules="rules" ref="registerRef">
      <el-form-item class="*:flex *:justify-center">
        <input class="hidden" type="file" accept=".jpg,.jpeg,.png" id="file" />
        <label for="file">
          <div
            class="flex flex-col justify-center items-center w-40 h-40 border border-dashed border-gray-400 hover:border-red-500 rounded-md">
            <upload-filled class="w-2/3 *:fill-gray-400" />
            <span>点击上传图片</span>
          </div>
        </label>
        <span>图片要求：1M以内，jpg、jpeg、png格式</span>
      </el-form-item>
      <el-form-item label="昵称" id="login-email" prop="name">
        <el-input v-model="registerForm.name" placeholder="例：哈基米" />
      </el-form-item>
      <el-form-item label="邮箱" id="login-email" prop="email">
        <el-input v-model="registerForm.email" placeholder="you@example.com" />
      </el-form-item>
      <el-form-item label="密码" id="login-password" prop="password">
        <el-input v-model="registerForm.password" placeholder="请输入6-20位密码" />
      </el-form-item>
      <el-form-item label="验证码" id="login-code" prop="code">
        <div class="w-full flex gap-3">
          <el-input v-model="registerForm.code" placeholder="请输入4位验证码" />
          <el-button type="danger" @click="getCode" class="">获取验证码</el-button>
        </div>
      </el-form-item>
      <el-form-item>

      </el-form-item>
      <div class="dialog-footer ">
        <div class="flex justify-around">
          <el-button type="danger" @click="showRegister = !showRegister" class="w-[10rem]">{{ buttonText }}</el-button>
          <el-button type="danger" @click="register(registerRef)" class="w-[10rem]">
            确认
          </el-button>
        </div>
      </div>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { emitter } from '@/utils/emitter';
import request from '@/utils/request';
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage, type FormInstance } from 'element-plus';

emitter.on('showLogin', () => {
  dialogFormVisible.value = true
})

const loginRef = ref()
const registerRef = ref()

const loginForm = ref({
  email: '',
  password: ''
})
const registerForm = ref({
  name: '',
  email: '',
  password: '',
  code: ''
})
const rules = ref({
  name: [
    { required: true, message: "昵称不能为空", trigger: 'blur' }
  ],
  email: [
    { required: true, message: "邮箱地址不能为空", trigger: 'blur' },
    { type: 'email', message: "请输入有效的邮箱地址", trigger: 'blur' }
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: 'change' },
    { min: 6, max: 20, message: "密码为6～20位数字或英文字母", trigger: 'change' }
  ],
  code: [
    { required: true, message: "验证码不能为空", trigger: 'blur' },
    { min: 4, max: 4, message: "验证码为4位数字", trigger: 'blur' }
  ]
})
const dialogFormVisible = ref(false)
const showRegister = ref(false)
const title = computed(() => {
  if (showRegister.value) {
    return '注册'
  } else {
    return '登录'
  }
})
const buttonText = computed(() => {
  if (showRegister.value) {
    return '去登录'
  } else {
    return '去注册'
  }
})

function login(formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.validate((valid) => {
    if (!valid) {
      return
    } else {
    }
  })
}

function getCode() {
  registerForm.value.email
}

function register(formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.validate((valid) => {
    if (!valid) {
      return
    } else {
      const file = (document.getElementById('file') as HTMLInputElement).files![0]
      const formData = new FormData()
      formData.append('avatar', file)
      formData.append('other', registerForm.value.email)
      //我们甚至不用设置content-type，因为axios会自动帮我们设置好
      request.post('/register', formData)
    }
  })
}
</script>

<style lang="scss" scoped></style>