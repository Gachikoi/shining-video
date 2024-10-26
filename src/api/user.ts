import request from "@/utils/request"

//我们甚至不用设置content-type，因为axios会自动帮我们设置好
export const reqChangeUserInfo = (data: FormData) => request.patch<string | undefined>('/user/info', data)