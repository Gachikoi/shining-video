<template>
  <div class="flex flex-col items-center gap-10">
    <H1Container title="社刊简介">
      <p class="indent-8 max-w-screen-lg tracking-wider leading-loose text-justify">视频组全称Shining ACG Video
        Studio，即晒你动漫社视频组，隶属于宣传部，经过乌鸦、渣渣、令君、梓泠、书名号、掌控-物质、ガチ恋等前辈们和组长们的发展，现在是研习ACG视频制作技术，并为社团提供数字媒体技术支持的部门。内容包括但不限于MAD、MMD、PV制作，书刊及海报设计制作，以及其他实用工具的研究应用。
      </p>
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