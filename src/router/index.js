const UserRouter = require("./UserRouter");

const router = (app) => {
  app.use("/api/user", UserRouter);
};

module.exports = router;
