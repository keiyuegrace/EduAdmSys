import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/LoginUser'
import Forgot from '@/components/login/Forgot'
import LoginAdmin from '@/components/login/LoginAdmin'
import Student from '@/components/student/Student'
import Header from '@/components/common/Header'
import Stu1_1 from '@/components/student/Stu1_1'
import Stu1_2 from '@/components/student/Stu1_2'
import Stu2 from '@/components/student/Stu2'
import Stu3 from '@/components/student/Stu3'
import Stu4_1 from '@/components/student/Stu4_1'
import Stu4_2 from '@/components/student/Stu4_2'
import Stu4_3 from '@/components/student/Stu4_3'

import Tea4_3 from '@/components/teacher/Tea4_3'
import Tea4_2 from '@/components/teacher/Tea4_2'
import Tea4_1 from '@/components/teacher/Tea4_1'
import Tea3 from '@/components/teacher/Tea3'
import Tea2 from '@/components/teacher/Tea2'
import Tea1_2 from '@/components/teacher/Tea1_2'
import Tea1_1 from '@/components/teacher/Tea1_1'
import Teacher from '@/components/teacher/Teacher.vue'

import Adm1_1 from '@/components/admin/Adm1_1'
import Adm1_2 from '@/components/admin/Adm1_2'
import Adm1_3 from '@/components/admin/Adm1_3'
import Adm2_1 from '@/components/admin/Adm2_1'
import Adm3_1 from '@/components/admin/Adm3_1'
import Adm3_2 from '@/components/admin/Adm3_2'
import Adm4 from '@/components/admin/Adm4'
import Admin from '@/components/admin/Admin.vue'

Vue.use(Router)
 
export default new Router({
  mode:'history',
    routes: [
        {
          path: '/',
          component: Login,
          meta:{
            keepalive:false
          }
        },
        {
          path:'/loginAdmin',
          component:LoginAdmin,
        },{
          path:'/header',
          component:Header,
          meta:{
            keepalive:false
          }
        },
        {
          path:'/forgot',
          name:'forgot',
          component:Forgot
        },
        {
          path: '/Student',
          component: Student,
          meta:{
            keepalive: false
          },
          children:[
            {
              path:'/Stu1_1',
              component:Stu1_1
            },
            {
              path:'/Stu1_2',
              component:Stu1_2
            },
            {
              path:'/Stu2',
              component:Stu2
            },
            {
              path:'/Stu3',
              component:Stu3
            },
            {
              path:'/Stu4_1',
              component:Stu4_1
            },
            {
              path:'/Stu4_2',
              component:Stu4_2
            },
            {
              path:'/Stu4_3',
              component:Stu4_3
            },
          ]
          
        },{
          path: '/Teacher',
          component: Teacher,
          meta:{
            keepalive: false
          },
          children:[
            {
              path:'/Tea1_1',
              component:Tea1_1
            },
            {
              path:'/Tea1_2',
              component:Tea1_2
            },
            {
              path:'/Tea2',
              component:Tea2
            },
            {
              path:'/Tea3',
              component:Tea3
            },
            {
              path:'/Tea4_1',
              component:Tea4_1
            },
            {
              path:'/Tea4_2',
              component:Tea4_2
            },
            {
              path:'/Tea4_3',
              component:Tea4_3
            },
          ]
          
        },{
          path: '/Admin',
          component: Admin,
          meta:{
            keepalive: false
          },
          children:[
            {
              path:'/Adm1_1',
              component:Adm1_1
            },
            {
              path:'/Adm1_2',
              component:Adm1_2
            },
            {
              path:'/Adm1_3',
              component:Adm1_3
            },
            {
              path:'/Adm2_1',
              component:Adm2_1
            },
            {
              path:'/Adm3_1',
              component:Adm3_1
            },
            {
              path:'/Adm3_2',
              component:Adm3_2
            },
            {
              path:'/Adm4',
              component:Adm4
            }
          ]
          
        }
      ]
})