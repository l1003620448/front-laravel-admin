import request from '@/utils/request'

export function getInfo() {
  return request({
    url:"/admin/info",
    method: "get",
    params: {include: 'role'}
  })
}

export function addAdmin(parameter) {
  return request({
    url: '/admins',
    method: 'post',
    data:parameter,
  });
}

export function updateAdmin(id,data) {
  return request({
    url: '/admins/'+id,
    method: 'put',
    data:data,
  });
}

//获取
export function getPermissions() {
  return request({
    url: "/admin/permissions",
    method: "get",
  })
}

export function getAdminList(parameter) {
  return request({
    url :"/admins",
    method:"get",
    params:parameter,
  })
}