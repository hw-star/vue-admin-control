import request from '@/utils/request'

export default{
  // 用户列表
  getUsersListPage(current,limit,fuzzyquery) {
    return request({
      url: `/user/userlist/${current}/${limit}`,
      method: 'get',
      params:{fuzzyquery}
    })
  },
  // 删除某个用户
  deleteUserId(id){
    return request({
      url: `/user/deleteuser/${id}`,
      method: 'delete'
    })
  },
  // 添加某个用户
  addUser(user){
    return request({
      url: `/user/adduser/`,
      method: 'post',
      data: user
    })
  },
  // 获取某个用户
  getUser(id){
    return request({
      url: `/user/getuser/${id}`,
      method: 'get'
    })
  },
  // 更新某个用户
  updateUser(user){
    return request({
      url: `/user/sysupdate`,
      method: 'post',
      data: user
    })
  },

  // 禁用某个用户
  StopUser(id,stateCode){
    return request({
      url: `/user/stopuser/${id}/${stateCode}`,
      method: 'get',
    })
  },

}