import request from '@/utils/request';

export function getPermissions(parameter) {
  return request({
    url:"/permissions",
    methods:"get",
    params:parameter,
  })
}
