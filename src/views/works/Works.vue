<template>
  <div class="flex flex-col items-center">
    <div class="w-screen max-w-screen-xl px-6">
      <div class="flex flex-col gap-10">
        <WorksCard v-for="(works,key) in worksStore.worksArr" :key="key" :works>
        </WorksCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import WorksCard from './WorksCard.vue';
import { useWorksStore } from '@/store/works';

const worksStore = useWorksStore()

onBeforeMount(async () => {
 await worksStore.getWorksInfo()
})
</script>]