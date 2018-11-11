import request from '@/utils/request';

//获取权限列表
export function getRoles() {
  return request({
    url:"/roles/list",
    methods:"get",
  })
}