const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

// const {
//   authMiddleWare,
//   authUserMiddleWare,
// } = require("../middleware/authMiddleware");

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.get("/getAll", userController.getAllUser);
router.get("/get/:id", userController.getUser);

module.exports = router;
