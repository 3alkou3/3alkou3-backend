const { getAllCategories } = require("../models/categoryModel");
const { getAllItems } = require("../models/itemModel");

module.exports = {
  getAllData: async (req, res) => {
    try {
      let categories = await getAllCategories() || [];
      let items = await getAllItems() || [];
      res.json({ categories, items })
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
  },
};
