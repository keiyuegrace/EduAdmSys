<template>
<div style="width:1150px">
  <el-table
    :data="infoTableData"
    border
    style="width: 100%">
    <el-table-column label="个人信息">
    <el-table-column
      prop="sid"
      label="学号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="150">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="100">
    </el-table-column>
    <el-table-column
      prop="birth"
      label="出生日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="politic"
      label="政治面貌"
      width="150">
    </el-table-column>
    <el-table-column
      prop="class"
      label="行政班级"
      width="150">
    </el-table-column>
    <el-table-column
      prop="state"
      label="学生状态"
      width="100">
    </el-table-column>
    <el-table-column
      prop="all_credit"
      label="总学分"
      width="100">
    </el-table-column>
    <el-table-column
      prop="avg_grade"
      label="平均成绩"
      width="100">
    </el-table-column>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import {getCookie} from '../global/cookie'
  export default {
    data() {
      return {
        infoTableData:[]
      }
    },
    methods:{
      getInfoTable(){
        this.$axios
        .post('/api/getInfoTable', { //获取查询学期课表接口
            userid: getCookie("userid")
        })
        .then((result)=> {
            result.data = JSON.stringify(result.data)
            result.data = JSON.parse(result.data)
            if (result.data.code === 1) {
                this.infoTableData = result.data.datas
            }else{
                console.log("查询失败");
                return false;
            }
        })
        .catch((error)=> {
            alert(error)
        })
      }
    },
    created:function(){
      this.getInfoTable()
    }
  }
</script>