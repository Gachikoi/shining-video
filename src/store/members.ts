import { defineStore } from "pinia";
import { ref } from "vue";
import { reqMemberArr, type MemberArr } from "@/api/members";
import type { AxiosResponse } from "axios";

export const useMembersStore = defineStore('Members', () => {
  const activeDuty = ref<MemberArr>([])
  const historicalDuty = ref<MemberArr>([])
  const founder = ref<MemberArr>([])
  const otherMembers = ref<MemberArr>([])

  async function getActiveDuty() {
    try {
      const result: AxiosResponse<MemberArr> = await reqMemberArr('activeDuty')
      if (result.status == 200) {
        activeDuty.value = result.data
      }
    } catch { }
  }
  async function getHistoricalDuty() {
    try {
      const result: AxiosResponse<MemberArr> = await reqMemberArr('historicalDuty')
      if (result.status == 200) {
        historicalDuty.value = result.data
      }
    } catch { }
  }
  async function getFounder() {
    try {
      const result: AxiosResponse<MemberArr> = await reqMemberArr('founder')
      if (result.status == 200) {
        founder.value = result.data
      }
    } catch { }
  }
  async function getOtherMembers() {
    try {
      const result: AxiosResponse<MemberArr> = await reqMemberArr('otherMembers')
      if (result.status == 200) {
        otherMembers.value = result.data
      }
    } catch { }
  }

  return { activeDuty, historicalDuty, founder, otherMembers, getActiveDuty, getHistoricalDuty, getFounder, getOtherMembers }
})