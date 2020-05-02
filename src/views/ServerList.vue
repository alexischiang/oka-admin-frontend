<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="no" label="No" width="50" fixed> </el-table-column>
      <el-table-column prop="account" label="Account" width="200">
      </el-table-column>
      <el-table-column prop="password" label="Password" width="100">
      </el-table-column>
      <el-table-column prop="subs" label="Subs" width="280"> </el-table-column>
      <el-table-column prop="note" label="Note" width="150"> </el-table-column>
      <el-table-column label="Users">
        <template slot-scope="scope">
          <span v-for="user in scope.row.users" :key="user._id">
            {{ user.name }},
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="total" label="Total" width="80"></el-table-column>
      <el-table-column fixed="right" label="Edit">
        <template slot-scope="scope">
          <!-- 点击‘编辑’跳转 -->
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/servers/edit/${scope.row._id}`)"
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
    };
  },
  computed: {
    tableData() {
      // deps
      let copy = this.ori;
      // let config = this.filterConfig;
      // logics
      copy.forEach((item) => {
        item.total = item.users.length;
        item.isAvailable = item.total < 7 ? true : false;
      });
      // copy = this.filterConfigHandler(copy, config);
      return copy;
    },
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/rest/servers");
      this.ori = res.data;
    },
    async remove(row) {
      await this.$http.delete(`/rest/servers/${row._id}`);
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
