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
      <el-form-item label="End Date">
        <el-date-picker
          v-model="model.endDate"
          type="date"
          placeholder="默认根据时长计算"
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
import calcDate from "../methods/calcDate";
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
        await this.$http.put(
          `/rest/users/${this.id}`,
          this.formatModel(this.model, "update")
        );
        this.$toasted.show("Updated!!", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 1000,
        });
      } else {
        // post request
        await this.$http.post(
          "/rest/users",
          this.formatModel(this.model, "add")
        );
        this.$toasted.show("Added!!", {
          theme: "toasted-primary",
          position: "top-right",
          duration: 1000,
        });
      }
      this.$router.push("/users");
    },
    async fetch() {
      const model = await this.$http.get(`/rest/users/${this.id}`);
      this.model = model.data;
    },
    async fetchNo() {
      const model = await this.$http.get(`/rest/users`);
      this.$set(this.model, "no", model.data.length + 1);
    },
    formatModel(model, cfg) {
      let copy = model;
      window.console.log(copy);
      if (cfg == "add") {
        copy.no = "gm" + copy.no;
      }
      if (copy.purchaseOnDate instanceof Date) {
        copy.purchaseOnDate = format.asString(
          "yyyy.MM.dd",
          copy.purchaseOnDate
        );
      }
      if (!copy.endDate) {
        copy.endDate = calcDate.AddDuration(copy.purchaseOnDate, copy.duration);
      } else {
        if (copy.endDate instanceof Date) {
          copy.endDate = format.asString("yyyy.MM.dd", copy.endDate);
        }
      }
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
