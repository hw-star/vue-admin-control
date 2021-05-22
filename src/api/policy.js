import request from '../utils/request'

export default{
  // 文件列表
  getPolicyListPage(current,limit,fuzzyquery) {
    return request({
      url: `/policy/policylistbysys/${current}/${limit}`,
      method: 'get',
      params:{fuzzyquery}
    });
  },
  // 获取某一个文件信息
  getOnePolicy(id){
    return request({
      url: `/policy/policylist/${id}`,
      method: 'get',
    });
  },
  //是否显示某个文件
  ShowPolicy(id,stateCode){
    return request({
      url: `/policy/showpolicy/${id}/${stateCode}`,
      method: 'get',
    })
  },
  // 删除某个文件
  deletePolicyId(id){
    return request({
      url: `/policy/deletepolicy/${id}`,
      method: 'delete'
    })
  },
  // 批量删除文件
  moreDeletePolicy(ids){
    return request({
      url: `/policy/moredeletepolicy`,
      method: 'post',
      data: ids
    })
  },
   // 更新某个文件  未实现！！！！！！！！！！！！！
   updateActivity(activity){
    return request({
      url: `/activity/updateactivity`,
      method: 'post',
      data: activity
    })
  },
  // 添加某个文件   未实现！！！！！！！！！！！！！
  addActivity(activity){
    return request({
      url: `/activity/saveActivity/`,
      method: 'post',
      data: activity
    })
  },
}