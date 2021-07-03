import axios from 'axios';
import { message } from 'antd';

const service = axios.create({
  // baseURL: process.env.BASE_API,
  timeout: 30000,
});

service.interceptors.request.use(
  (config) => {
    if (sessionStorage.getItem('authToken')) {
      config.headers['token'] = sessionStorage.getItem('authToken');
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code == 0) {
      return res;
    } else if (res.code !== 500) {
      message.error(res.message);
      return res;
      // return Promise.reject(res)
    }
  },
  (error) => {
    // const status = error.request.status
    // if (error.code === "ECONNABORTED") {
    //     message.error("平台未能响应您的操作，请刷新页面并重试！")
    // } else if (status === 500) {
    //     message.error("平台未能响应您的操作，请联系平台管理员解决！")
    // } else if (status === 401 || status === 403 || status === 401 || status === 403) {
    //     window.onpopstate = null;
    //     sessionStorage.clear();
    //     message.warning("您的登录已过期，请重新登录");
    //     // setTimeout(() => (window.location.href = "#/login"), 1000);
    // } else {
    //     message.error(error.message);
    // }
    return Promise.reject(error);
  },
);

const get = (url, params = {}, isAllResponse) => {
  return service({
    url: url,
    method: 'GET',
    params,
    // headers: {
    //     token: sessionStorage.getItem('token')
    // }
  }).then((rs) => (isAllResponse ? rs : rs && rs.result));
};

const post = (url, data = {}, isAllResponse) => {
  return service({
    url: url,
    method: 'POST',
    data,
  }).then((rs) => (isAllResponse ? rs : rs && rs.result));
};

export { get, post };
