import { reqGetWorksInfo, type WorksArr } from "@/api/works";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useWorksStore = defineStore('Works', () => {
  const worksArr = ref<WorksArr>()

  async function getWorksInfo() {
    try {
      const { data } = await reqGetWorksInfo()
      worksArr.value=data
    }catch{}
  }

  return {worksArr,getWorksInfo}
}, {
  persist: true
})