<template>
  <div class="flex justify-center">
    <div class="w-screen max-w-screen-xl space-y-10">
      <H1Container title="活动内容">
        <p class="indent-8 max-w-screen-lg tracking-wider leading-loose text-justify">视频组全称Shining ACG Video
          Studio，即晒你动漫社视频组，隶属于宣传部，经过乌鸦、渣渣、令君、梓泠、书名号、掌控-物质、ガチ恋等前辈们和组长们的发展，现在是研习ACG视频制作技术，并为社团提供数字媒体技术支持的部门。内容包括但不限于MAD、MMD、PV制作，书刊及海报设计制作，以及其他实用工具的研究应用。
        </p>
      </H1Container>
      <H1Container title="活动影像">
        <ul class="columns-md space-y-5 gap-x-5 *:*:shadow-md">
          <li v-for="{ id, path } in imagePictures" :key="id"><img style="box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);"
              :src="serverURL + path" alt="">
          </li>
        </ul>
      </H1Container>
      <H1Container title="?">
        <ul class="columns-xs w-full space-y-5 gap-x-5 *:*:shadow-md">
          <li v-for="{ id, path } in chatPictures" :key="id"><img style="box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);"
              :src="serverURL + path" alt="">
          </li>
        </ul>
      </H1Container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reqActivityChatPictures, reqActivityImagePictures, type ActivityPicture } from '@/api/activity';
import H1Container from './H1Container.vue';
import type { AxiosResponse } from 'axios';
import { type ActivityPictureArr } from '@/api/activity';
import { onBeforeMount, ref } from 'vue';
import { serverURL } from '@/api/config';

let chatPictures = ref<ActivityPictureArr>(), imagePictures = ref<ActivityPictureArr>()

onBeforeMount(async () => {
  try {
    const async1 = reqActivityChatPictures
    const async2 = reqActivityImagePictures
    const result1: AxiosResponse<ActivityPictureArr> = await async1()
    const result2: AxiosResponse<ActivityPictureArr> = await async2()
    chatPictures.value = result1.data
    imagePictures.value = result2.data
  } catch { }
})
</script>

<style lang="scss" scoped></style>