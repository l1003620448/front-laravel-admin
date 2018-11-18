import request from '@/utils/request';

export function getRoleList(parameter) {
  return request({
    url:"/roles",
    methods:"get",
    params:parameter,
  })
}

//获取权限列表
export function getRoles() {
  return request({
    url:"/roles/list",
    methods:"get",
  })
}

export function updateRole(id,data) {
  return request({
    url: '/roles/'+id,
    method: 'put',
    data:data,
  });
}

export function addRole(data) {
  return request({
    url: '/roles',
    method: 'post',
    data:data,
  });
}