<template>
  <div class="flex flex-col items-center gap-10">
    <H1Container title="社刊简介">
      <p class="indent-8 max-w-screen-lg tracking-wider leading-loose text-justify"></p>
    </H1Container>
    <H1Container title="历年社刊">
      <ul class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        <li v-for="{ id, path, coverPath, title } in journals" :key="id">
          <JournalCard :id :path :coverPath :title></JournalCard>
        </li>
      </ul>
    </H1Container>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import JournalCard from './JournalCard.vue';
import { reqJournalArr, type JournalArr } from '@/api/journal';
import H1Container from '@/views/activity/H1Container.vue';

let journals = ref<JournalArr>()
onBeforeMount(async () => {
  try {
    const result = await reqJournalArr()
    journals.value = result.data
  } catch { }
})
</script>

<style lang="scss" scoped></style>