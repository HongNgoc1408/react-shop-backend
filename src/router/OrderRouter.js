const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");

const {
  authUserMiddleWare,
  authMiddleWare,
} = require("../middleware/authMiddleware");

router.post("/create", OrderController.createOrder);
router.get("/getAll/:id", OrderController.getAllDetailsOrder);
router.get("/get/:id", OrderController.getDetailsOrder);
router.delete("/cancel-order/:id", OrderController.cancelOrderDetails);
router.get("/getAll", OrderController.getAllOrder);
router.put("/update/:id", OrderController.updateOrder);
router.delete("/delete-order/:id", OrderController.deleteOrderDetails);

module.exports = router;
