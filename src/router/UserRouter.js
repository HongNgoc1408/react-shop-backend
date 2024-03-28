const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const authMiddleWare = require("../middleware/authMiddleware");

router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", authMiddleWare, userController.deleteUser);
router.get("/getAllUser", authMiddleWare, userController.getAllUser);
router.get("/getUser", userController.getUser);

module.exports = router;
