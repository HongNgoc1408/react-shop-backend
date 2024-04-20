const express = require("express");
const typeController = require("../controllers/TypeController");
const router = express.Router();

router.post("/create", typeController.createType);
router.put("/update/:id", typeController.updateType);
router.delete('/delete/:id', typeController.deleteType);
router.get('/get/:id', typeController.getType);
router.get('/getAll', typeController.getAllType);

module.exports = router;
