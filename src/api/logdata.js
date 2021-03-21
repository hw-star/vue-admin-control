import request from '@/utils/request'

export default{
  // 获取首页数据
  getLogData() {
    return request({
      url: `/logdata/getlogdata`,
      method: 'get',
    })
  },
}