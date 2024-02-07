const express = require("express");
const router = express.Router();
const itemRoutes = require("./itemRoutes");
const categoryRoutes = require("./categoryRoutes");
const userRoutes = require("./userRoutes");
const dataRoutes = require("./dataRoutes")



router.use("/items", itemRoutes);
router.use("/categories", categoryRoutes);
router.use("/auth", userRoutes);
router.use("/data", dataRoutes)

module.exports = router;
