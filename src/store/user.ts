import { defineStore } from "pinia";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { emitter } from "@/utils/emitter";

export const useUserStore = defineStore('User', () => {
  const router = useRouter()
  
  const isLogin = ref(false)
  const id=ref('')
  const name = ref('')
  const email=ref('')
  const avatarPath = ref('')
  const token = ref('')
  
  function loginOut() {
    isLogin.value = false
    name.value = ''
    email.value = ''
    avatarPath.value = ''
    token.value = ''
    isLogin.value = false
    ElMessage({
      type: 'success',
      message: '登出成功'
    })
    router.push('/home')
    emitter.emit('loginOut')
  }

  return {isLogin,id,name,email,avatarPath,token,loginOut}
}, {
  persist:true
})