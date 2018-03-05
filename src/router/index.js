import Vue from 'vue'
import Router from 'vue-router'
import Repertoire from '@/components/Repertoire.vue'
import InviteEmployees from '@/components/InviteEmployees/Index.vue'
import DailyPaper from '@/components/DailyPaper/Index.vue'
import FirstInstance from '@/components/FirstInstance/Index.vue'
import StoreLocation from '@/components/StoreLocation/Index.vue'
import StoresDaily from '@/components/StoresDaily/Index.vue'
import MonthlyReport from '@/components/MonthlyReport/Index.vue'
import MonthlyApproval from '@/components/MonthlyApproval/Index.vue'
import StatisticsMonthlyReport from '@/components/StatisticsMonthlyReport/Index.vue'
import ModifyLog from '@/components/ModifyLog/Index.vue'
import InputInformation from '../components/InviteEmployees/InputInformation/Index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/InviteEmployees',
      meta: {
        title: "邀请员工"
      },
      component: function (resolve) {
        require(['../components/InviteEmployees/Index.vue'], resolve)
      }
    },
    {
      path: '/InviteEmployees/InputInformation',
      meta: {
        title: "录入信息"
      },
      component: function (resolve) {
        require(['../components/InviteEmployees/InputInformation/Index.vue'], resolve)
      }
    },
    {
      path: '/DailyPaper',
      meta: {
        title: "日报授权"
      },
      component: function (resolve) {
        require(['../components/DailyPaper/Index.vue'], resolve)
      }
    },
    {
      path: '/FirstInstance',
      meta: {
        title: "代打卡"
      },
      component: function (resolve) {
        require(['../components/FirstInstance/Index.vue'], resolve)
      }
    },
    {
      path: '/StoreLocation',
      meta: {
        title: "门店位置"
      },
      component: function (resolve) {
        require(['../components/StoreLocation/Index.vue'], resolve)
      }
    },
    {
      path: '/StoresDaily',
      meta: {
        title: "门店日报"
      },
      component: function (resolve) {
        require(['../components/StoresDaily/Index.vue'], resolve)
      }
    },
    {
      path: '/MonthlyReport',
      meta: {
        title: "门店月报"
      },
      component: function (resolve) {
        require(['../components/MonthlyReport/Index.vue'], resolve)
      }
    },
    {
      path: '/MonthlyApproval',
      meta: {
        title: "月报审批"
      },
      component: function (resolve) {
        require(['../components/MonthlyApproval/Index.vue'], resolve)
      }
    },
    {
      path: '/StatisticsMonthlyReport',
      meta: {
        title: "统计月报"
      },
      component: function (resolve) {
        require(['../components/StatisticsMonthlyReport/Index.vue'], resolve)
      }
    },
    {
      path: '/ModifyLog',
      meta: {
        title: "修改日志"
      },
      component: function (resolve) {
        require(['../components/ModifyLog/Index.vue'], resolve)
      }
    },
    {
      path: '/',
      meta: {
        title: '全部功能'
      },
      component: function (resolve) {
        require(['../components/Repertoire.vue'], resolve)
      }
    },
    /*{
      path: "*",
      meta: {
        title: '全部功能'
      },
      component: Repertoire
    }*/
  ]
})
