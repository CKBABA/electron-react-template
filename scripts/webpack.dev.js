const base = require("./webpack.base");
const {merge} = require("webpack-merge");

module.exports = merge(base, {
  mode: "development",
  devServer: {
    open: true, //编译完自动打开浏览器
    port: 8080,
  },
});
