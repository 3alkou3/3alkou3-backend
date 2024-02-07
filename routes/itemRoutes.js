
const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.get("/", itemController.getAllItems);
router.get("/:itemId", itemController.getItemById);
router.post("/", itemController.createItem);
router.put("/:itemId", itemController.updateItem);
router.delete("/:itemId", itemController.deleteItem);

module.exports = router;
