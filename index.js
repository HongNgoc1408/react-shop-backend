const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./src/router");
const bodyParser = require("body-parser");
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

router(app);

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    console.log("Connect DB success !");
  })
  .catch((err) => {
    console.lof(err);
  });

app.listen(port, () => {
  console.log("Server is running in port", port);
});
