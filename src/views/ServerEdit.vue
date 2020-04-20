<template>
  <div>
    <h1>{{ id ? "Edit" : "Create" }} Server</h1>
    <el-form
      label-position="left"
      @submit.native.prevent="save"
      label-width="80px"
    >
      <el-form-item label="No.">
        <el-input v-model="model.no" style="width:10vw"></el-input>
      </el-form-item>
      <el-form-item label="Account" style="width:30vw">
        <el-input v-model="model.account"></el-input>
      </el-form-item>
      <el-form-item label="Password" style="width:30vw">
        <el-input v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item label="Subs" style="width:50vw">
        <el-input v-model="model.subs"></el-input>
      </el-form-item>
      <el-form-item label="Users">
        <el-select
          v-model="model.users"
          multiple
          filterable
          placeholder="Search by WeChat ID"
          style="float:left;width:50vw"
        >
          <el-option
            v-for="item in users"
            :key="item._id"
            :label="item.no"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" style="float:left"
          >submit</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
      users: [],
    };
  },
  methods: {
    async save() {
      if (this.id) {
        // put request
        await this.$http.put(`/server/${this.id}`, this.model);
        this.$toasted.show("Updated!!", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 1000,
        });
      } else {
        // post request
        await this.$http.post("/server", this.model);
        this.$toasted.show("Added!!", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 1000,
        });
      }
      this.$router.push("/server");
    },
    async fetch() {
      const res = await this.$http.get(`server/${this.id}`);
      this.model = res.data;
    },
    async fetchNo() {
      const model = await this.$http.get(`server`);
      this.$set(this.model, "no", model.data.length + 1);
    },
    async getUsers() {
      const users = await this.$http.get("user");
      this.users = users.data;
    },
  },
  created() {
    this.getUsers();
    if (this.id) {
      this.fetch();
    } else {
      this.fetchNo();
    }
  },
};
</script>

<style>
h1 {
  text-align: left;
  margin: 30px 0;
}
</style>
