<template>
  <div class="chart-main-container">
    <h1>数据图表</h1>
    <el-tabs type="border-card" value="first">
      <el-tab-pane label="收入曲线" name="first">
        <el-switch
          style="display: block;text-align:left"
          v-model="changeChart"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="收入"
          inactive-text="下单人数"
        >
        </el-switch>
        <div class="income-chart-container">
          <ve-line
            :data="incomeData"
            :settings="chartSettings"
            :legend-visible="false"
          ></ve-line>
        </div>
      </el-tab-pane>
      <el-tab-pane label="购买时长" name="second">购买时长</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      changeChart: true,
      oriData: {},
      activeName: "first",
      incomeData: {
        columns: ["日期", "收入", "下单人数"],
        rows: [],
      },
    };
  },
  computed: {
    chartSettings() {
      return this.changeChart
        ? { metrics: ["收入"] }
        : { metrics: ["下单人数"] };
    },
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/rest/users");
      this.oriData = res.data;
      this.incomeData.rows = this.getRows();
    },
    getRows() {
      let rows = this.oriData
        .sort((a, b) => a.no.substr(2) - b.no.substr(2))
        .map((item) => {
          let obj = {};
          obj["日期"] = item.purchaseOnDate;
          obj["收入"] = Number(item.paid);
          return obj;
        });
      for (let i = 0; i < rows.length; i++) {
        let count = 1;
        while (rows[i + 1] && rows[i]["日期"] == rows[i + 1]["日期"]) {
          count++;
          rows[i]["收入"] =
            Number(rows[i]["收入"]) + Number(rows[i + 1]["收入"]);
          rows.splice(i + 1, 1);
        }
        rows[i]["下单人数"] = count;
      }
      return rows;
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss">
.chart-main-container {
  padding: 0 5vw;
  .el-tabs__content {
    padding: 2vw;
  }
  h1 {
    font-size: 30px;
  }
}
</style>
