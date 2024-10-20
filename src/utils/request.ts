import axios from "axios";
import { ElMessage } from "element-plus";

const request = axios.create({
  baseURL: '', //请求的基础路径的设置
  timeout: 5000 //超时的事件
})

request.interceptors.request.use((config) => {
  return config
})

request.interceptors.response.use((response) => {
  return response.data
}, (error => {
  let status = error.response.status
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
        message: '其他错误'
      })
  }
}))

export default request