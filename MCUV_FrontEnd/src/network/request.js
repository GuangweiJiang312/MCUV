import axios from 'axios'

export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL:'./api',
    //   baseURL:'http://106.52.187.27:8089/api',
    // timeout:5000
  })

  //2.拦截器
  instance.interceptors.request.use(config => {
    return config
  },err => {
    console.log(err)
  })

   instance.interceptors.response.use(res => {
     return res.data
   },err => {
     console.log(err)
   })

  //3.发送网络请求
  return instance(config)
}
