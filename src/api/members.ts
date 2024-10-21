import request from "@/utils/request"

export const reqMemberArr = (key: string) => request.get<MemberArr>('/members/' + key)

export interface Member{
  "id": string,
  "path": string,
  "name": string,
  "title"?: string,
  "contact"?: string,
  "bililink"?: string
}

export type MemberArr=Member[]