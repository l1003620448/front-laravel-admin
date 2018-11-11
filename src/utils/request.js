import Vue from 'vue'
import axios from 'axios'
import notification from 'ant-design-vue/es/notification'
import { getToken } from "@/utils/auth"

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE, // api base_url
  timeout: 15000 // 请求超时时间
});


// request 拦截器
service.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers['Accept'] = "application/x.laravel-admin.v1+json";
    config.headers[ 'Authorization' ] = "Bearer "+ token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  // Vue.$throw(error);
  Promise.reject(error);
});



// respone拦截器
service.interceptors.response.use(
  response => response.data,
  err => {
    // Vue.$throw(err);
    if (err.response) {
      const status = err.response.status;
      let msg = err.response.data.message;

      if (!msg) {
        switch (status) {
          case 403:
            msg = '无权操作';
            break;
          case 422:
            msg = '表单验证错误';
            break;
          default:
            msg = '数据错误';
            break;
        }
      }

      switch (status) {
        case 401:
          notification.error({ message: '未授权', description: '授权验证失败' });
          // store.dispatch('Logout').then(() => {
          //   location.reload()
          // });
          break;
        default :
          notification.error({ message: msg, description: msg });
          break;
      }

    }else{
      notification.error({ message: err.message, description: err.message });
    }
    return Promise.reject(err);
  }
);

export default service
