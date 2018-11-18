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
