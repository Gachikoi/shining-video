<template>
  <div>
    <SubmitWorksInfoBanned v-if="!userStore.permission"></SubmitWorksInfoBanned>
    <div v-else class="flex flex-col items-center gap-5">
      <h2>编辑作品信息</h2>
      <WorksCard class="w-full md:w-7/12 lg:w-8/12 xl:w-9/12" :works="worksStore.worksArr?.[userStore.id]" :editable="true"></WorksCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import SubmitWorksInfoBanned from './EditWorksInfoBanned.vue';
import WorksCard from '@/views/works/WorksCard.vue';
import { useWorksStore } from '@/store/works';
import { onBeforeMount } from 'vue';
import { reqGetWorksInfo } from '@/api/works';

const userStore = useUserStore()
const worksStore = useWorksStore()

onBeforeMount(async () => {
  try {
    await worksStore.getWorksInfo()
  }catch{}
})
</script>

<style lang="scss" scoped></style>