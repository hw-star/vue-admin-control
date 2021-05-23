import request from '@/utils/request'

export function uploadFile(data) {
  return request({
    url: '/oss/fileoss',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}