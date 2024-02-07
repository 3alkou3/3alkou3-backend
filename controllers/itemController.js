// controllers/itemController.js

const itemModel = require("../models/itemModel");

module.exports = {
  getAllItems: async (req, res) => {
    try {
      const items = await itemModel.getAllItems();
      res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  createItem: async (req, res) => {
    try {
      const { name, price, categoryId, type, description, order } = req.body;
      const item = await itemModel.createItem(
        name,
        price,
        categoryId,
        type,
        description,
        order
      );
      res.json(item);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  getItemById: async (req, res) => {
    try {
      const { itemId } = req.params;
      const item = await itemModel.getItemById(parseInt(itemId, 10));
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json(item);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  updateItem: async (req, res) => {
    try {
      const { itemId } = req.params;
      const newData = req.body;
      const updatedItem = await itemModel.updateItem(
        parseInt(itemId, 10),
        newData
      );
      res.json(updatedItem);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  deleteItem: async (req, res) => {
    try {
      const { itemId } = req.params;
      const item = await itemModel.deleteItem(parseInt(itemId, 10));
      res.status(200).json(item); 
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};
