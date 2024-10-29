import request from "@/utils/request";

export const reqActivityChatPictures = () => request.get<ActivityPictureArr>('/activity/chat')
export const reqActivityImagePictures = () => request.get<ActivityPictureArr>('/activity/image')

export interface ActivityPicture{
  id: string,
  path: string,
  alt?:string
}

export type ActivityPictureArr = ActivityPicture[]
