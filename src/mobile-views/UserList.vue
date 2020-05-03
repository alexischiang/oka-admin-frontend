<template>
  <div class="mobile-server-list">
    <van-list>
      <van-cell v-for="item in table" :key="item._id">
        {{ `${item.name} ${item.endDate}` }}
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import userList from "../methods/user-list";
export default {
  data() {
    return {
      ori: [],
      table: [],
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/users");
      this.ori = res.data;
      let ul = new userList(this.ori).formatData();
      this.table = ul.tableData;
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style></style>
