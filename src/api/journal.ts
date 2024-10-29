import request from "@/utils/request"

export const reqJournalArr = () => request.get<JournalArr>('/getJournals')

export interface Journal {
  "id": string,
  "path": string,
  coverPath: string,
  title:string
}

export type JournalArr = Journal[]