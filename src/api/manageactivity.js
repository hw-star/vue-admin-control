import request from '@/utils/request'

export default{
  // 活动列表
  getActivityListPage(current,limit,activityBody) {
    return request({
      url: `/activity/activitylist/${current}/${limit}`,
      method: 'post',
      data: activityBody
    });
  },
  // 取消某个用户的某个活动
  disApplyId(id){
    return request({
      url: `/orders/deleteorder/${id}`,
      method: 'delete'
    })
  },
  // 添加某个活动
  addActivity(activity){
    return request({
      url: `/activity/saveActivity/`,
      method: 'post',
      data: activity
    })
  },
  // 获取某个活动
  getActivity(id){
    return request({
      url: `/activity/getactivity/${id}`,
      method: 'get'
    })
  },
  // 获得Orders某个项目的人员名单
  getOredersListPage(id,current,limit,fuzzyquery) {
    return request({
      url: `/orders/orderlist/${id}/${current}/${limit}`,
      method: 'get',
      params:{fuzzyquery}
    })
  },
  // 更新某个活动
  updateActivity(activity){
    return request({
      url: `/activity/updateactivity`,
      method: 'post',
      data: activity
    })
  },
  //是否启用某个活动
  StopActivity(id,stateCode){
    return request({
      url: `/activity/stopactivity/${id}/${stateCode}`,
      method: 'get',
    })
  },
  deleteActivityId(id){
    return request({
      url: `/activity/deleteactivity/${id}`,
      method: 'delete'
    })
  },
  // 批量删除活动
  moreDeleteActivity(ids){
    return request({
      url: `/activity/moredeleteactivity`,
      method: 'post',
      data: ids
    })
  },

}