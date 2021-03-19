import request from '@/utils/request'

export default{
  // 角色列表
  getRolesList() {
    return request({
      url: `/role/rolelist`,
      method: 'get',
    })
  },
  //更改某个管理员角色
  updatesysUserRole(sorId,sorRoid){
    return request({
      url: `/role/updatesysuserrole/${sorId}/${sorRoid}`,
      method: 'get',
    })
  },
}