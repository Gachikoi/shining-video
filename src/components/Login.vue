<template>
  <el-dialog v-model="dialogFormVisible" title="登录 / 注册 " class="w-[32rem]">
    <el-form :model="form">
      <el-form-item label="邮箱" id="login-email">
        <el-input v-model="form.email" placeholder="you@example.com" />
      </el-form-item>
      <el-form-item label="密码" id="login-password">
        <el-input v-model="form.password" />
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
import { ref } from 'vue';

const form = ref({
  email: '',
  password: '',
})
const dialogFormVisible = ref(true)
</script>

<style lang="scss" scoped></style>