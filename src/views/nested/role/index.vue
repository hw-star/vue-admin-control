<template>
  <div style="padding:30px;">
    <el-table
    :data="tableData"
    style="width: 100%"
    row-key="id"
    border
    lazy
    :loading="load">
    <el-table-column
      align="center"
      prop="id"
      label="ID"
      width="120">
    </el-table-column>
    <el-table-column
      align="center"
      prop="roleName"
      label="角色"
      width="190">
    </el-table-column>
    <el-table-column
      align="center"
      prop="roleDescription"
      label="描述">
    </el-table-column>
    <el-table-column
      align="center"
      label="代码"
      width="240">
      <template slot-scope="scope">
        <el-tag type="success">{{scope.row.roleCode}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import api from "@/api/roles";
export default {
  data(){
    return {
      tableData: [],
      load: true
    }
  },
  created(){
    this.getlist()
  },
  methods:{
    getlist(){
      api.getRolesList().then(response =>{
        this.tableData = response.data
      }).catch(error =>{})
    }
  }
}
</script>

