const ProductRouter = require("./ProductRouter");
const UserRouter = require("./UserRouter");
const OrderRouter = require("./OrderRouter");
const TypeRouter = require("./TypeRouter");

const router = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/product", ProductRouter);
  app.use("/api/order", OrderRouter);
  app.use("/api/type", TypeRouter);
};

module.exports = router;
