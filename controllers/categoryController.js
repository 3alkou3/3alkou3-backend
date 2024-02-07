
const categoryModel = require("../models/categoryModel");

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await categoryModel.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  getCategoryById: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const category = await categoryModel.getCategoryById(
        parseInt(categoryId, 10)
      );
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  createCategory: async (req, res) => {
    try {
      const { name, type, order, icon } = req.body;
      console.log({ name, type, order, icon });
      const newCategory = await categoryModel.createCategory(name, type, order, icon);
      res.json(newCategory);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const newData = req.body;
      const updatedCategory = await categoryModel.updateCategory(
        parseInt(categoryId, 10),
        newData
      );
      res.json(updatedCategory);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const category = await categoryModel.deleteCategory(parseInt(categoryId, 10));
      res.status(200).json(category) 
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};
