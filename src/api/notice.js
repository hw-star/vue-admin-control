import request from '../utils/request'

export default{
  // 通知公告列表
  getNoticeListPage(current,limit,fuzzyquery) {
    return request({
      url: `/notice/noticelistbysys/${current}/${limit}`,
      method: 'get',
      params:{fuzzyquery}
    });
  },
  // 获取某一个通知公告
  getOneNotice(id){
    return request({
      url: `/notice/noticelist/${id}`,
      method: 'get',
    });
  },
  //是否显示某个通知公告
  ShowNotice(id,stateCode){
    return request({
      url: `/notice/shownotice/${id}/${stateCode}`,
      method: 'get',
    })
  },
  // 删除某个通知公告
  deleteNoticeId(id){
    return request({
      url: `/notice/deletenotice/${id}`,
      method: 'delete'
    })
  },
  // 批量删除通知公告
  moreDeleteNotice(ids){
    return request({
      url: `/notice/moredeletenotice`,
      method: 'post',
      data: ids
    })
  },
   // 更新某个通知公告
   updateNotice(notice){
    return request({
      url: `/notice/updatenotice`,
      method: 'post',
      data: notice
    })
  },
  // 添加某个通知公告
  addNotice(notice){
    return request({
      url: `/notice/savenotice`,
      method: 'post',
      data: notice
    })
  },
}