<template>
  <div>
    <el-alert :title="ul.nextExpired" type="warning" show-icon> </el-alert>
    <el-table :data="table" style="width: 100%" show-summary>
      <el-table-column prop="no" label="No" width="100"> </el-table-column>
      <el-table-column prop="name" label="WeChat ID"> </el-table-column>
      <el-table-column
        prop="purchaseOnDate"
        label="Purchase On"
        width="170"
        :filters="dateFilter"
        :filter-method="dateFilterHandler"
      >
      </el-table-column>
      <el-table-column prop="endDate" label="End Date" width="170" sortable>
      </el-table-column>
      <el-table-column
        prop="duration"
        label="Duration"
        width="100"
        :filters="durationFilter"
        :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column prop="paid" label="Paid" width="80"> </el-table-column>
      <el-table-column
        prop="expired"
        label="Expired"
        width="100"
        :filters="expiredFilter"
        :filter-method="filterHandler"
      ></el-table-column>
      <el-table-column label="Renewal" width="100">
        <template slot-scope="scope">
          <span>{{ showRenewal(scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <!-- 点击‘编辑’跳转 -->
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/users/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import userList from "../methods/user-list";
export default {
  data() {
    return {
      table: [],
      ori: [],
      durationFilter: [
        { text: "1月", value: "1月" },
        { text: "3月", value: "3月" },
        { text: "半年", value: "半年" },
        { text: "一年", value: "一年" },
      ],
      expiredFilter: [
        { text: "Yes", value: "Yes" },
        { text: "No", value: "No" },
      ],
      dateFilter: [
        { text: "2020.5", value: "2020.5" },
        { text: "2020.4", value: "2020.4" },
        { text: "2020.3", value: "2020.3" },
        { text: "2020.2", value: "2020.2" },
      ],
      ul: {
        nextExpired: [],
      },
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/users");
      this.ori = res.data;
      let ul = new userList(this.ori).formatData();
      this.table = ul.tableData;
      this.ul.nextExpired = ul.getNextExpired();
    },
    async remove(row) {
      await this.$http.delete(`rest/users/${row._id}`);
      this.$toasted.show("Deleted!!", {
        theme: "toasted-primary",
        position: "top-right",
        duration: 1000,
      });
      this.fetch();
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    dateFilterHandler(value, row, column) {
      // 根据value动态生成regexp匹配筛选
      // 如 value:2020.4 -> /2020.(0)?4/g
      const property = column["property"];
      let reg = new RegExp(
        `${value.split(".")[0]}.(0)?${value.split(".")[1]}`,
        "g"
      );
      this.test = reg;
      return reg.test(row[property]);
    },
    showRenewal(item) {
      return item.renewal instanceof Object ? item.renewal.no : "-";
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
