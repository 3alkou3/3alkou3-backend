const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getAllItems: async () => {
    return prisma.item.findMany();
  },
  createItem: async (name, price, categoryId, type, description, order) => {
    return prisma.item.create({
      data: {
        name,
        price,
        category: { connect: { id: categoryId } },
        type,
        description,
        order,
      },
    });
  },
  updateItem: async (itemId, newData) => {
    const { order: newOrder } = newData;

    // Fetch the existing item to get its current order
    const existingItem = await prisma.item.findUnique({
      where: { id: itemId },
      select: { order: true },
    });

    if (!existingItem) {
      throw new Error("Item not found");
    }

    const currentOrder = existingItem.order;

    // Update the item being updated with the new order
    const updatedItem = await prisma.item.update({
      where: { id: itemId },
      data: { order: newOrder, ...newData },
    });

    // Update the other item with the target order to have the original order
    await prisma.item.updateMany({
      where: { order: newOrder, id: { not: itemId } },
      data: { order: currentOrder },
    });

    return updatedItem;
  },

  deleteItem: async (itemId) => {
    // Fetch the item to get its order before deletion
    const itemToDelete = await prisma.item.findUnique({
      where: { id: itemId },
      select: { order: true },
    });

    if (!itemToDelete) {
      throw new Error("Item not found");
    }

    const orderToDelete = itemToDelete.order;

    // Delete the item
    const deletedItem = await prisma.item.delete({
      where: { id: itemId },
    });

    // Update the order of other items
    await prisma.item.updateMany({
      where: {
        order: { gt: orderToDelete },
      },
      data: {
        order: {
          decrement: 1,
        },
      },
    });
    return deletedItem;
  },
  getItemById: async (itemId) => {
    return prisma.item.findUnique({
      where: { id: itemId },
    });
  },
};
