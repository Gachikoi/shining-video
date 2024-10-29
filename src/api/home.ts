import request from "@/utils/request"

export const reqLastestVideos = () => request.get<LastestVideoArr>('/home/lastestVideos')
export const reqLastestTypesettings = () => request.get<LastestTypesettingArr>('/home/lastestTypesettings')
export const reqCarouselImages = () => request.get<CarouselImageArr>('/home/carouselImages')

export interface LastestVideo{
  "id": string,
  "title": string,
  "path":string,
  "link": string
}

export type LastestVideoArr = LastestVideo[]

export interface LastestTypesetting{
  "id": string,
  "path": string
}

export type LastestTypesettingArr = LastestTypesetting[]

export interface CarouselImage{
  "id": string,
  "path": string,
  "alt": string,
  link?: string,
  title?:string
}

export type CarouselImageArr=CarouselImage[]