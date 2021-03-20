import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sysuser/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/sysuser/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/sysuser/logout',
    method: 'post'
  })
}

export function update(sysUser) {
  return request({
    url: `/sysuser/update`,
    method: 'post',
    data: sysUser
  })
}
export function findPwd(data) {
  return request({
    url: `/sysuser/findpwd`,
    method: 'post',
    data
  })
}
