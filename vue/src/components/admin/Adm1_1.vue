<template>
  <div style="width:1100px">
  <el-row type="flex" justify="space-between" style="margin-bottom:5px">
  <el-col :span="3">
      <el-select v-model="deptSelected" placeholder="请选择学院" style="width:150px" size="small">
            <el-option
            v-for="item in deptOptions"
            :key="item.dept"
            :label="item.label"
            :value="item.dept">
            </el-option>
        </el-select>
    </el-col>
    <el-col :span="3">
        <el-select v-model="gradeSelected" placeholder="请选择年级" style="width:150px" size="small">
            <el-option
            v-for="item in gradeOptions"
            :key="item.grade"
            :label="item.label"
            :value="item.grade">
            </el-option>
        </el-select>
    </el-col>
    <el-col :span="12">
    <el-input v-model="search" placeholder="请输入搜索内容"  size="small">
        <el-button slot="append" icon="el-icon-search" @click="searchOk">搜索</el-button>
    </el-input>
  </el-col>
     <el-button type="primary" size="small" @click="dialogFormVisible = true" icon="el-icon-plus">添加学生</el-button>
     <el-button type="primary" plain size="small" @click="exportExcel" icon="el-icon-folder-add">导入学生</el-button>
  </el-row>

  <div style="background-color:#eff1f2;padding:5px;border-radius: 2px;">
  <el-table
    :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
    v-loading="loading"
    border
    stripe
    style="width: 100%"
    :header-row-style="{height:0+'px'}"
    :header-cell-style="{padding:0+'px'}"
    :row-style="{height:'20px'}"
    :cell-style="{padding:'2px'}">
    <el-table-column type="index" label="序号" width="59">
    </el-table-column>
    <el-table-column prop="number" label="学号" width="110">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="150">
    </el-table-column>
    <el-table-column prop="state" label="状态" width="60">
    </el-table-column>
    <el-table-column prop="sex" label="性别" width="50">
    </el-table-column>
    <el-table-column prop="class" label="班级" width="100">
    </el-table-column>
    <el-table-column prop="dept" label="学院" width="180">
    </el-table-column>
    <el-table-column prop="id" label="身份证号" width="200">
    </el-table-column>
    <el-table-column prop="birth" label="出生日期" width="110">
    </el-table-column>
    <el-table-column prop="politic" label="政治面貌" width="120">
    </el-table-column>
    <el-table-column prop="graduate" label="毕业学校" width="200">
    </el-table-column>
    <el-table-column prop="tel" label="电话号码" width="120">
    </el-table-column>
    <el-table-column fixed="right" prop="operate" label="操作" width="150">
      <template slot-scope="scope">
          <el-button size="mini" plain type="primary"
            @click="handleAdd(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" plain type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
    </el-table-column>
  </el-table>
  </div>
  <el-pagination
  background
  layout="prev, pager, next"
  :page-size="pageSize"
  :total="totalCount"
  :current-page="currentPage"
  @current-change="handleCurrentChange"
  style="text-align:center">
  </el-pagination>

  <el-dialog title="新开设课程" :visible.sync="dialogFormVisible" close-on-click-modal=false width="30%">
  <el-form :model="form">
    <el-form-item label="课程名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="开设院校" :label-width="formLabelWidth">
      <el-select v-model="form.dept" placeholder="请选择">
      <el-option
          v-for="item in deptOptions"
          :key="item.dept"
          :label="item.label"
          :value="item.dept">
          </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="课程类别" :label-width="formLabelWidth">
      <el-select v-model="form.type" placeholder="请选择">
        <el-option label="专业必修" value="pro_com"></el-option>
        <el-option label="专业选修" value="pro_ele"></el-option>
        <el-option label="通识必修" value="gen_com"></el-option>
        <el-option label="通识选修" value="gen_ele"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-col :span="12">
        <el-form-item label="学时" :label-width="formLabelWidth">
          <el-input v-model="form.hours" type="number" autocomplete="off"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="学分" :label-width="formLabelWidth" >
          <el-input v-model="form.credit" type="number" autocomplete="off"></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addCourseData">提交</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import {getCookie} from '../global/cookie'
import deptOptions from '../global/deptOptions'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
  export default {
    data() {
      return {
        deptOptions:deptOptions,
        deptSelected: '',
        gradeSelected:'',
        search: '',

        tableData:[],//目前前端所拥有的所有课程信息

        pageSize:17,
        currentPage:1,
        totalCount:1,
        loading:false,

         dialogFormVisible: false,
          form: {
          name: '',
          dept:'',
          type: '',
          hours: '',
          credit: '',
        },
        formLabelWidth: '80px'
      }
    },
    computed:{
        gradeOptions(){
            let myData = new Date()
            var year1 = myData.getFullYear()
            let month1 = myData.getMonth()
            var options = []
            if(month1<8){
                year1--
            }
            for(var i=0;i<6;i++){
                options[i] = {
                    grade:year1,
                    label:year1+'级'
                }
                year1--
            }
            return options
        }
    },
    methods:{
      //根据条件请求某一页数据
      getTableData(size,page){
        this.$axios
        .post('/api/getStuTableData', { //search为空,dept为all查询全部课程，search为空dept不为all查询某学院课程，
        //search不为空dept为空在所有课程中搜索，search和dept都不为空在某学院里搜索
            pageSize:size,
            page:page,
            dept:this.deptSelected,
            grade:this.gradeSelected,
            search:this.search
        })
        .then((result)=> {
            if (result.data.code === 1) {//返回第一页数据，和
              this.totalCount = result.data.datas.len
              this.tableData = result.data.datas.stu
            }else{
              return false;
            }
        })
        .catch((error)=> {
            alert(error)
        })
      },

      handleCurrentChange(val) {
        this.currentPage = val
        this.getTableData(this.pageSize,val)
      },

      searchOk(){
        this.currentPage = 1
        this.getTableData(this.pageSize,1)
      },

      //添加课程
      addCourseData(){
        this.$axios
        .post('/api/addCourseData', { //提交成绩接口

        })
        .then((result)=> {
            if (result.data.code === 1) {
              alert("成绩更新成功！")
            }else{
              alert("成绩更新失败！")
              return false;
            }
        })
        .catch((error)=> {
            alert(error)
        })
      },

    },
    created(){
      this.getTableData(this.pageSize,1)
    }
  }
</script>