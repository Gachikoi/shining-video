import request from "@/utils/request";

export const reqGetWorksInfo = () => request.get<WorksArr>('/worksInfo/get')

export interface Video {
  path: string,
  link: string,
  title: string,
  id: string
}

export type VideoArr = Video[]

export interface Typesetting {
  path: string,
  id: string
}

export type TypesettingArr = Typesetting[]

export interface Works{
  avatarPath: string,
  name:string,
  videos: VideoArr,
  typesettings:TypesettingArr
}

export interface WorksArr {
  [key:string]:Works
}