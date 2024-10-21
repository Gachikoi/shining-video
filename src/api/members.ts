import request from "@/utils/request"

export const reqHome = (key: string) => request.get('/members/' + key)