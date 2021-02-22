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
