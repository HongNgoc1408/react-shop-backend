
const routes = (app) => {
  app.use("/api/user", (req, res) => {
    res.send("User Page");
  });
};

module.exports = routes;
