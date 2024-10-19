<template>
  <div>
    <hr class="border-2 border-red-500 mb-10">
    <div class="w-screen h-96 bg-slate-400"></div>
    <button @click="func">点我发送请求</button>
  </div>
</template>

<script lang="ts" setup>
import request from '@/api/image'
import { AxiosError } from 'axios';
import { ElMessage } from 'element-plus';

async function func() {
  try {
    let result = await request()
    console.log(result);
  } catch (error) {
    const axiosError=error as AxiosError
    console.log(axiosError.response?.data);
    
  }
  
}
</script>

<style lang="scss" scoped>

</style>