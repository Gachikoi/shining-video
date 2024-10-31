<template>
  <div>
    <SubmitWorksInfoBanned v-if="!userStore.permission"></SubmitWorksInfoBanned>
    <div v-else>
      <div class="h-40 w-full"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import SubmitWorksInfoBanned from './SubmitWorksInfoBanned.vue';

const userStore=useUserStore()
</script>

<style lang="scss" scoped></style>