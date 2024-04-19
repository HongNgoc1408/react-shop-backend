const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { authUserMiddleWare } = require("../middleware/authMiddleware");

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);
router.put("/update/:id", authUserMiddleWare, userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.get("/getAll", userController.getAllUser);
router.get("/get/:id", authUserMiddleWare, userController.getUser);
// router.post("/refresh-token", userController.refreshToken);
router.post("/loginAdmin", userController.loginAdmin);
module.exports = router;
