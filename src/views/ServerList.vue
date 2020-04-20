<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="no" label="no" width="50"> </el-table-column>
      <el-table-column prop="account" label="account" width="300">
      </el-table-column>
      <el-table-column prop="password" label="password" width="100">
      </el-table-column>
      <el-table-column prop="subs" label="subs" width="280"> </el-table-column>
      <el-table-column label="users">
        <template slot-scope="scope">
          <span v-for="user in scope.row.users" :key="user._id">
            {{ user.name }},
          </span>
        </template>
      </el-table-column>
      <el-table-column label="total" width="80">
        <template slot-scope="scope">
          <span>
            {{ scope.row.users.length }}
          </span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <!-- 点击‘编辑’跳转 -->
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/server/edit/${scope.row._id}`)"
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
      tableData: [],
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("server");
      this.tableData = res.data;
    },
    async remove(row) {
      await this.$http.delete(`server/${row._id}`);
      this.$toasted.show("Deleted!!", {
        theme: "toasted-primary",
        position: "top-right",
        duration: 1000,
      });
      this.fetch();
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
