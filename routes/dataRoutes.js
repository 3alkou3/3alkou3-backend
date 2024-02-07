const express = require("express");
const router = express.Router();
const { getAllData } = require("../controllers/dataController");
router.get("/all", getAllData);

module.exports = router;

