<template>
  <div>
    <SubmitWorksInfoBanned v-if="!userStore.permission"></SubmitWorksInfoBanned>
    <div v-else class="flex flex-col items-center gap-5">
      <h2>编辑作品信息</h2>
      <WorksCard class="w-full md:w-7/12 lg:w-8/12 xl:w-9/12" :key="key" :works="worksStore.worksArr?.[userStore.id]"
        :editable="true"></WorksCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import SubmitWorksInfoBanned from './EditWorksInfoBanned.vue';
import WorksCard from '@/views/works/WorksCard.vue';
import { useWorksStore } from '@/store/works';
import { onBeforeMount, onBeforeUnmount, onMounted } from 'vue';
import { ref } from 'vue';
import { emitter } from '@/utils/emitter';

const userStore = useUserStore()
const worksStore = useWorksStore()
const key = ref(0)

onBeforeMount(async () => {
  worksStore.getWorksInfo()
  userStore.updatePermission()
  emitter.on('forceWorksCardUpdate', () => {
    key.value++
    console.log(key.value);

  })
})

onBeforeUnmount(() => {
  emitter.off('forceWorksCardUpdate')
})
</script>

<style lang="scss" scoped></style>