<template>
<div class="changePT" style="height:250">
  <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px">
  <el-form-item label="原密码：" prop="oldPass">
    <el-input v-model="userForm.oldPass"></el-input>
  </el-form-item>
  
   <el-form-item label="新密码：" prop="pass">
    <el-input type="password" v-model="userForm.pass" show-password></el-input>
  </el-form-item>

  <el-form-item label="确认密码：" prop="checkPass">
    <el-input type="password" v-model="userForm.checkPass" show-password></el-input>
  </el-form-item>
  
  <el-form-item>
    <el-button type="primary" @click="submitForm('userForm')" style="width:300px">确认</el-button>
  </el-form-item>
</el-form>
</div>
</template>

<script>
  import {getCookie} from '../global/cookie'
  export default {
    data() {
        var validateOldPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('密码不能为空'));
            } else {
            callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('密码不能为空'));
            } else {
            callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.userForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
        userForm: {
            oldPass:'',
            pass:'',
            checkPass:''
        },
        rules: {
            oldPass: [{ validator: validateOldPass, trigger: 'blur' }],
            pass: [{ validator: validatePass, trigger: 'blur' }],
            checkPass: [{ validator: validatePass2, trigger: 'blur' }]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                //提交表单
                var data = JSON.stringify(this.userForm)
                alert(data)//测试提交的数据
                this.$axios
                .post('/api/changePwd', { //  
                    userid: getCookie("userid"),
                    identify: getCookie("identify"),
                    data
                })
                .then((result)=> {
                if (result.data.code === 1) {
                    alert("密码已修改")//测试返回数据
                }else if(result.data.code === -1){
                    alert("原密码错误")
                }else{
                    console.log("密码重置失败");
                    return false;
                }
                })
                .catch((error)=> {
                    alert(error)
                })
            } else {
                alert('请检查输入');
                return false;
            }
        })
      }
    }
  }
</script>