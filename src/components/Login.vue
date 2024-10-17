<template>
  <el-dialog v-model="dialogFormVisible" title="登录 / 注册 " class="w-80 sm:w-96 md:w-[32rem]">
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item label="邮箱" id="login-email" prop="email">
        <el-input v-model="form.email" placeholder="you@example.com" />
      </el-form-item>
      <el-form-item label="密码" id="login-password" prop="password">
        <el-input v-model="form.password" placeholder="请输入6-20个字符的密码" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer flex flex-col space-y-2">
        <div class="flex justify-center items-center text-neutral-400">未注册过的账号，我们将自动帮你注册</div>
        <div class="flex justify-around">
          <el-button type="info" @click="dialogFormVisible = false" class="w-[10rem]">取消</el-button>
          <el-button type="danger"  @click="dialogFormVisible = false" class="w-[10rem]">
            确认
          </el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {type FormRules } from 'element-plus';
import { ref } from 'vue';
import { emitter } from '@/utils/emitter';

emitter.on('showLogin', () => {
  dialogFormVisible.value=true
})

const formRef=ref()

const form = ref({
  email: '',
  password: '',
})

interface FormType{
  email: string,
  password:string
}

const rules = ref<FormRules<FormType>>({
  email: [
    { required: true, message: "邮箱地址不能为空", trigger: 'blur' },
    { type: 'email', message: "请输入有效的邮箱地址", trigger: 'blur' }
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: 'change' },
    { min: 6, max: 20, message:"密码为6～20个字符",trigger:'change'}
  ]
})
const dialogFormVisible = ref(false)
</script>

<style lang="scss" scoped></style>