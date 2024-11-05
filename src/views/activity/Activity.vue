<template>
  <div class="flex justify-center">
    <div class="w-screen max-w-screen-xl space-y-10">
      <H1Container title="活动内容">
        <div>
          <p class="indent-8 max-w-screen-lg tracking-wider leading-loose text-justify">除了线上的聊天吹水外，我们还有许多企划与线下活动。</p>
          <p class="indent-8 max-w-screen-lg tracking-wider leading-loose text-justify">每年的企划包括：晒你拜年祭、晒斯卡宣传、MEP等等，我们还会承担晒你纪等活动的直播与录制工作。线下活动包括每周的部门活动与可能会存在的晒你纪视频组摊位（?）。每周的部门活动包括：视频（MAD、MMD、PV等）鉴赏、各类教学（Pr、Ae、Blender、MAD、MMD、排版教学等）以及打牌、吃饭（雾）。</p>
        </div>
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
          <li v-for="{ id, path } in chatPictures" :key="id"><img loading="lazy"
              style="box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);" :src="serverURL + path" alt="">
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