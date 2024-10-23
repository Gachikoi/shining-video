import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('User', () => {
  const id = ref('')
  const name = ref('')
  const email=ref('')
  const avatarPath = ref('')
  const token = ref('')
  


  return {id,name,email,avatarPath,token}
}, {
  persist:true
})