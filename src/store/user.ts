import { defineStore } from "pinia";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { emitter } from "@/utils/emitter";
import { reqUpdatePermission } from "@/api/user";

export const useUserStore = defineStore('User', () => {
  const router = useRouter()
  
  const isLogin = ref(false)
  const id=ref('')
  const name = ref('')
  const email=ref('')
  const avatarPath = ref('')
  const token = ref('')
  const permission=ref(false)
  
  function loginOut() {
    isLogin.value = false
    name.value = ''
    email.value = ''
    avatarPath.value = ''
    token.value = ''
    id.value=''
    permission.value=false
    ElMessage({
      type: 'success',
      message: '登出成功'
    })
    router.push('/home')
    emitter.emit('loginOut')
  }

  async function updatePermission() {
    try {
      const { data } = await reqUpdatePermission()
      permission.value=data
    }catch{}
  }

  return {isLogin,id,name,email,avatarPath,token,permission,loginOut,updatePermission}
}, {
  persist:true
})