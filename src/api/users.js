import request from '@/utils/request'

export default{
  // 管理员列表
  getsysUsersListPage(current,limit,fuzzyquery) {
    return request({
      url: `/sysuser/sysuserlist/${current}/${limit}`,
      method: 'get',
      params:{fuzzyquery}
    })
  },
  // 删除某个管理员
  deletesysUserId(id){
    return request({
      url: `/sysuser/deletesysuser/${id}`,
      method: 'delete'
    })
  },
  // 添加某个管理员
  addsysUser(sysUser){
    return request({
      url: `/sysuser/addsysuser/`,
      method: 'post',
      data: sysUser
    })
  },
  // 获取某个管理员
  getsysUser(id){
    return request({
      url: `/sysuser/getsysuser/${id}`,
      method: 'get'
    })
  },
  // 更新某个管理员
  updatesysUser(sysUser){
    return request({
      url: `/sysuser/updatesysuser`,
      method: 'post',
      data: sysUser
    })
  },

  // 禁用某个管理员
  StopsysUser(id,stateCode){
    return request({
      url: `/sysuser/stopsysuser/${id}/${stateCode}`,
      method: 'get',
    })
  },

}