const express = require("express");
const productController = require("../controllers/ProductController");
const router = express.Router();

router.post("/create", productController.createProduct);
router.put("/update/:id", productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.get('/get/:id', productController.getProduct);
router.get('/getAll', productController.getAllProduct);

module.exports = router;
