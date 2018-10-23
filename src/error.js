/**
 * @file error.js
 * @version 1.0.0
 * @created on 29/05/2018
 * @author Keeva Jiang (keevajiang@126.com)
 */

import Vue from 'vue';
import { getToken } from '@/utils/auth';
// import axois from 'axios';

const userAgent = navigator.userAgent;
// 系统错误捕获
const errorHandler = (error, vm) => {
  let keys = Object.getOwnPropertyNames(error);
  let obj = {
    userAgent,
    token: getToken(),
    url: location.href,
    vm
  };
  for (let i in keys) {
    obj[keys[i]] = error[keys[i]];
  }
  if (error.config) {
    obj.requestUrl = error.config.url;
  }
  console.error(obj);
  if (process.env.RELEASE_ENV === 'production') {
    // TODO 发送 error log
  }
};

Vue.config.errorHandler = errorHandler;
Vue.prototype.$throw = (error) => errorHandler(error, this);
Vue.$throw = (error) => errorHandler(error, null);
