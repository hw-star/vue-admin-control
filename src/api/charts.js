import request from '@/utils/request'

export default{
  // 获取首页数据
  getChartData() {
    return request({
      url: `/chartuser/getchart`,
      method: 'get',
    })
  },
}