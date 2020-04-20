<template>
  <div>
    <h1>{{ id ? "Edit" : "Create" }} User</h1>
    <el-form
      label-position="left"
      @submit.native.prevent="save"
      label-width="150px"
    >
      <el-form-item label="No." style="width:20vw">
        <el-input v-model="model.no"></el-input>
      </el-form-item>
      <el-form-item label="WeChat ID" style="width:50vw">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="Purchase On">
        <el-date-picker
          v-model="model.purchaseOnDate"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Duration">
        <el-radio-group v-model="model.duration">
          <el-radio-button label="1月">1 Month</el-radio-button>
          <el-radio-button label="3月">3 Months</el-radio-button>
          <el-radio-button label="半年">6 Months</el-radio-button>
          <el-radio-button label="一年">1 Year</el-radio-button>
          <el-radio-button label="custom">Custom</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Paid">
        <el-input v-model="model.paid" style="width:10vw"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import format from "date-format";
import calcDate from "../calcDate";
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
      lastNo: "",
    };
  },
  methods: {
    async save() {
      if (this.id) {
        // put request
        await this.$http.put(`/user/${this.id}`, this.model);
        this.$toasted.show("Updated!!", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 1000,
        });
      } else {
        // post request
        await this.$http.post("/user", this.formatModel(this.model));
        this.$toasted.show("Added!!", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 1000,
        });
      }
      this.$router.push("/user");
    },
    async fetch() {
      const model = await this.$http.get(`user/${this.id}`);
      this.model = model.data;
    },
    async fetchNo() {
      const model = await this.$http.get(`user`);
      this.$set(this.model, "no", model.data.length + 1);
    },
    formatModel(model) {
      let copy = model;
      copy.no = "gm" + copy.no;
      copy.purchaseOnDate = format.asString("yyyy.MM.dd", copy.purchaseOnDate);
      copy.endDate = calcDate.AddDuration(copy.purchaseOnDate, copy.duration);
      return copy;
    },
    watchPaid() {
      switch (this.model.duration) {
        case "一年":
          this.model.paid = 200;
          break;
        case "3月":
          this.model.paid = 60;
          break;
        case "半年":
          this.model.paid = 110;
          break;
        case "1月":
          this.model.paid = 25;
          break;
        default:
          this.model.paid = "";
          break;
      }
    },
  },
  created() {
    if (this.id) {
      this.fetch();
    } else {
      this.fetchNo();
      this.model.purchaseOnDate = new Date();
    }
    this.unwatch = this.$watch("model.duration", () => {
      this.watchPaid();
    });
  },
};
</script>

<style>
h1 {
  text-align: left;
  margin: 30px 0;
}

.el-form-item__content > div,
button {
  float: left;
}
</style>
