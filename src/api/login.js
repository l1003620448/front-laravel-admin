import request from '@/utils/request';

//登录.
export function login(parameter) {
  return request({
    url: '/admin/login',
    method: 'post',
    data:parameter,
  });
}

//退出登录.
export function logout() {
  return request({
    url:"/admin/logout",
    method:"delete",
  })
}

//刷新 token.
export function refresh_token(refresh_token) {
  return request({
    url: "/admin/token/refresh",
    method: "post",
    data:refresh_token
  })
}
