<template>
  <div class="flex flex-col items-center gap-10">
    <H1Container title="社刊简介">
      <div>
        <p class="indent-8 max-w-screen-lg tracking-wider leading-loose text-justify">
          虽说社刊并不是视频组的传统任务，但近几年的社刊都是由视频组成员进行编辑工作的，因此也放在视频组官网中进行展示啦～</p>
        <p class="indent-8 max-w-screen-lg tracking-wider leading-loose text-justify">
          故事要从这里开始讲起：第七期社刊主编——令君，对前六期社刊进行了扫描和整理，才让它们得以重现。而随着令君接过制作社刊的任务，后续社刊的编纂工作也阴差阳错地一直在视频组内进行着。</p>
        <p class="indent-8 max-w-screen-lg tracking-wider leading-loose text-justify">
          有关社刊的历史：社刊第一期最早可以追溯到07/08年，第三期、第四期的社刊合刊并没有被发行过。我们暂时没有更多有关社刊历史的信息了，如果有前辈愿意讲述社刊历史，以便于我们留下记录，欢迎联系站长ガチ恋。</p>
      </div>
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