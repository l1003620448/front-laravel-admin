import request from '@/utils/request'

export function getInfo() {
  return request({
    url:"/admin/info",
    method: "get",
    params: {include: 'role'}
  })
}

//获取
export function getPermissions() {
  return request({
    url: "/admin/permissions",
    method: "get",
  })
}

export function getAdminList() {
  return request({
    url :"/admins",
    method:"get",
  })
}