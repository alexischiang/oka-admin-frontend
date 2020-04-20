<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="no" label="No" width="100"> </el-table-column>
      <el-table-column prop="name" label="WeChat ID"> </el-table-column>
      <el-table-column prop="purchaseOnDate" label="Purchase On" width="170">
      </el-table-column>
      <el-table-column prop="endDate" label="End Date" width="170">
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
        width="80"
      ></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <!-- 点击‘编辑’跳转 -->
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/user/edit/${scope.row._id}`)"
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
export default {
  data() {
    return {
      ori: [],
      durationFilter: [
        { text: "1月", value: "1月" },
        { text: "3月", value: "3月" },
      ],
    };
  },
  computed: {
    tableData() {
      const now = new Date().getTime();
      this.ori.forEach((item) => {
        item.expired = new Date(item.endDate).getTime() < now ? "Yes" : "No";
      });
      return this.ori;
    },
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("user");
      this.ori = res.data;
    },
    async remove(row) {
      await this.$http.delete(`user/${row._id}`);
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
