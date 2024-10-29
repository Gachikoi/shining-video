import request from "@/utils/request"

//我们甚至不用设置content-type，因为axios会自动帮我们设置好
export const reqRegister = (data: FormData) => request.post<RegisterResponseData>('/register', data)
export const reqCode=(email:string)=>request.get('/code/'+email)
export const reqLogin = (data: Object) => request.post<LoginResponseData>('/login', data)

export interface RegisterResponseData{
  token: string,
  avatarPath: string,
}

export interface LoginResponseData{
  token: string,
  avatarPath: string,
  name:string
}