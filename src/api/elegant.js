import request from '../utils/request'

export default{
  // 志愿风采列表
  getElegantListPage(current,limit,fuzzyquery) {
    return request({
      url: `/elegant/elegantlistbysys/${current}/${limit}`,
      method: 'get',
      params:{fuzzyquery}
    });
  },
  //是否显示某个志愿风采
  ShowElegant(id,stateCode){
    return request({
      url: `/elegant/showelegant/${id}/${stateCode}`,
      method: 'get',
    })
  },
  // 删除某个志愿风采
  deleteElegantId(id){
    return request({
      url: `/elegant/deleteelegant/${id}`,
      method: 'delete'
    })
  },
  // 批量删除志愿风采
  moreDeleteElegant(ids){
    return request({
      url: `/elegant/moredeleteelegant`,
      method: 'post',
      data: ids
    })
  },
   // 更新某个志愿风采
   updateElegant(elegant){
    return request({
      url: `/elegant/updateelegant`,
      method: 'post',
      data: elegant
    })
  },
  // 添加某个志愿风采
  addElegant(elegant){
    return request({
      url: `/elegant/saveelegant`,
      method: 'post',
      data: elegant
    })
  },
  // 获取某一个志愿风采
  getOneElegant(id){
    return request({
      url: `/elegant/elegantlist/${id}`,
      method: 'get',
    });
  },
}