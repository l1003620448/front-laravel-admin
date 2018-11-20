import request from '@/utils/request';

export function getPermissionList() {
  return request({
    url:"/permissions/list",
    methods:"get",
  })
}

export function getPermissions(parameter) {
  return request({
    url:"/permissions",
    methods:"get",
    params:parameter,
  })
}

export function addPermission(data) {
  return request({
    url:"/permissions",
    method: 'post',
    data:data,
  })
}

export function updatePermission(id,data) {
  return request({
    url: '/permissions/'+id,
    method: 'put',
    data:data,
  });
}
