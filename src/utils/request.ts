import axios from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/user";

const request = axios.create({
  baseURL: '/api', //请求的基础路径的设置
  timeout: 5000, //超时的时间
})

request.interceptors.request.use((config) => {
  let userStore = useUserStore();
  //token:公共参数,如果用户登录了需要携带
  if (userStore.token) {
    config.headers.token = userStore.token;
  }
  return config
})

request.interceptors.response.use((response) => {
  return response
}, (error => {
  let status = error.status
  let data = error.response.data
  switch (status) {
    case 404:
      ElMessage({
        type: 'error',
        message: '客户端请求路径错误'
      })
      break
    case 500:
      ElMessage({
        type: 'error',
        message: '服务器错误'
      })
      break
    default:
      ElMessage({
        type: 'error',
        message: data
      })
  }
}))

export default request