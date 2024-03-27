const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./src/router");
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

routes(app);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Đã kết nối đến cơ sở dữ liệu MongoDB");
  })
  .catch((err) => {
    console.error("Lỗi kết nối đến cơ sở dữ liệu MongoDB:", err);
  });

app.listen(port, () => {
  console.log("Server đang chạy ở cổng", port);
});
