import { reqGetWorksInfo, type WorksArr } from "@/api/works";
import { ElLoading } from "element-plus";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useWorksStore = defineStore('Works', () => {
  const worksArr = ref<WorksArr>()

  async function getWorksInfo() {
    let loadingInstance
    try {
      loadingInstance=ElLoading.service()
      const { data } = await reqGetWorksInfo()
      loadingInstance.close()
      //ref的响应式是浅层的，但是这里改变了worksArr的地址，所以会触发响应式
      worksArr.value=data
    } catch {
      loadingInstance?.close()
    }
  }

  return {worksArr,getWorksInfo}
}, {
  persist: true
})