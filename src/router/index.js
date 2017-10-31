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
      component: InviteEmployees
    },
    {
      path: '/InviteEmployees/InputInformation',
      meta: {
        title: "录入信息"
      },
      component: InputInformation
    },
    {
      path: '/DailyPaper',
      meta: {
        title: "日报授权"
      },
      component: DailyPaper
    },
    {
      path: '/FirstInstance',
      meta: {
        title: "代打卡"
      },
      component: FirstInstance
    },
    {
      path: '/StoreLocation',
      meta: {
        title: "门店位置"
      },
      component: StoreLocation
    },
    {
      path: '/StoresDaily',
      meta: {
        title: "门店日报"
      },
      component: StoresDaily
    },
    {
      path: '/MonthlyReport',
      meta: {
        title: "门店月报"
      },
      component: MonthlyReport
    },
    {
      path: '/MonthlyApproval',
      meta: {
        title: "月报审批"
      },
      component: MonthlyApproval
    },
    {
      path: '/StatisticsMonthlyReport',
      meta: {
        title: "统计月报"
      },
      component: StatisticsMonthlyReport
    },
    {
      path: '/ModifyLog',
      meta: {
        title: "修改日志"
      },
      component: ModifyLog
    },
    {
      path: '/main',
      meta: {
        title: '全部功能'
      },
      component: Repertoire
    },
    {
      path: "*",
      meta: {
        title: '全部功能'
      },
      component: Repertoire
    }
  ]
})
