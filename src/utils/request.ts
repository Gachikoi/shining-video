import axios from "axios";
import { ElMessage } from "element-plus";

const request = axios.create({
  baseURL: '/api', //请求的基础路径的设置
  timeout: 5000, //超时的时间
})

request.interceptors.request.use((config) => {
  // let userStore = useUserStore();
  // //token:公共参数,如果用户登录了需要携带
  // if (userStore.userInfo.token) {
  //   config.headers.token = userStore.userInfo.token;
  // }
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
      console.log(data,error)
      switch (data) {
        case '验证码错误':
          ElMessage({
            type: 'error',
            message: '验证码错误'
          })
          break
        case '还未发送验证码':
          ElMessage({
            type: 'error',
            message: '还未发送验证码'
          })
          break
        default:
          ElMessage({
            type: 'error',
            message: '其他错误'
          })
      }
  }
}))

export default request