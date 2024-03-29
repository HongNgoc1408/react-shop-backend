const ProductRouter = require("./ProductRouter");
const UserRouter = require("./UserRouter");

const router = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/product", ProductRouter);
  // app.use("/api/order", OrderRouter);
  // app.use("/api/payment", PaymentRouter);
};

module.exports = router;
