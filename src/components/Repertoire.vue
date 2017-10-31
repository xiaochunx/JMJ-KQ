<template>
  <div v-wechat-title="$route.meta.title">
    <mt-index-list :show-indicator="false">
      <mt-index-section index=" " v-for="(item,count) in list" :key="count">
        <mt-cell v-for="(value,index) in item" :title="value.name" is-link :to="value.url" :key="index">
          <img slot="icon" :src="'./static/repertoire/' + value.src" width="24" height="24" style="margin-right: 20px">
        </mt-cell>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [
          [
            {
              name: "邀请员工",
              url: "/InviteEmployees",
              src: "InviteEmployees.png"
            },
            {
              name: "日报授权",
              url: "/DailyPaper",
              src: "DailyPaper.png"
            },
            {
              name: "代打卡",
              url: "/FirstInstance",
              src: "FirstInstance.png"
            }
          ], [
            {
              name: "门店位置",
              url: "/StoreLocation",
              src: "StoreLocation.png"
            },
            {
              name: "门店日报",
              url: "/StoresDaily",
              src: "StoresDaily.png"
            },
            {
              name: "门店月报",
              url: "/MonthlyReport",
              src: "MonthlyReport.png"
            }
          ], [
            {
              name: "月报审批",
              url: "/MonthlyApproval",
              src: "MonthlyApproval.png"
            },
            {
              name: "统计月报",
              url: "/StatisticsMonthlyReport",
              src: "StatisticsMonthlyReport.png"
            },
            {
              name: "修改日志",
              url: "ModifyLog",
              src: "ModifyLog.png"
            }
          ]
        ]
      }
    },
    components: {},
    methods: {
      changes(url) {
        this.$router.push(url);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .backColor {

    .mint-indexlist {
      .mint-indexlist-content {
        margin-right: 0 !important;
        li.mint-indexsection:nth-child(1) {
          > p.mint-indexsection-index {
            padding: 0 !important;
          }
        }
      }
    }
    .mint-indexlist-nav{
      display: none !important;
    }
  }
</style>
