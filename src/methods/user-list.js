class userList {
  constructor(tableData) {
    this.tableData = tableData;
  }
  /**
   * formatData() 格式化源数据
   *
   * @returns {Object} 返回this链式调用
   */
  formatData() {
    // 原始数据预处理
    const now = new Date().getTime();
    let copy = this.tableData;
    copy.forEach((item, index, arr) => {
      // 表格数据结构改变
      item.expired = new Date(item.endDate).getTime() < now ? "Yes" : "No";
      item.renewal = "-";
      let curName = item.name;
      for (let j = index + 1; j < arr.length; j++) {
        if (arr[j].name == curName) {
          item.renewal = arr[j];
          break;
        }
      }
    });
    // 按no顺序显示
    this.tableData = copy.sort((a, b) => a.no.substr(2) - b.no.substr(2));
    return this;
  }
  getNextExpired() {
    const today = new Date().getTime();
    let tableData = this.tableData;
    let min = 999999999999999;
    let res;
    for (let i = 0; i < tableData.length; i++) {
      let date = new Date(tableData[i].endDate).getTime();
      if (date - today <= min && date > today && tableData[i].renewal == "-") {
        window.console.log(tableData[i].renewal);
        min = date - today;
        res = tableData[i];
      }
    }

    let str = `即将过期:${res.name}(${res.no}); 到期日期:${res.endDate}`;
    return str;
  }
  /**
   * getUsersByMonth() 根据参数返回对应月份购买/结束的用户
   *
   * @param {String}month 年月如'2020.04'
   * @param {Number}config 0:购买 1:到期
   * @returns {String} 筛选后的用户数组
   */
  getUsersByMonth(month, config) {
    let copy = this.tableData;
    let target = config === 0 ? "purchaseOnDate" : "endDate";
    let reg = new RegExp(
      `${month.split(".")[0]}.(0)?${month.split(".")[1]}`,
      "g"
    );
    return copy.filter((i) => {
      return reg.test(i[target]);
    });
  }
}

export default userList;
