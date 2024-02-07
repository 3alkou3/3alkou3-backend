const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getAllCategories: async () => {
    return prisma.category.findMany();
  },
  createCategory: async (name, type, order, icon) => {
    return prisma.category.create({
      data: {
        name,
        type,
        order: Number(order),
        icon: icon,
      },
    });
  },
  getCategoryById: async (categoryId) => {
    return prisma.category.findUnique({
      where: { id: categoryId },
    });
  },
  deleteCategory: async (categoryId) => {
    // Fetch the category to get its order before deletion
    const categoryToDelete = await prisma.category.findUnique({
      where: { id: categoryId },
      select: { order: true },
    });

    if (!categoryToDelete) {
      throw new Error("Category not found");
    }

    const orderToDelete = categoryToDelete.order;

    // Delete the category
    const deletedCategory = await prisma.category.delete({
      where: { id: categoryId },
    });

    // Update the order of other categories
    await prisma.category.updateMany({
      where: {
        order: { gt: orderToDelete },
      },
      data: {
        order: {
          decrement: 1,
        },
      },
    });
    return deletedCategory;
  },

  updateCategory: async (categoryId, newData) => {
    newData.order = Number(newData.order)
    const { order: newOrder } = newData;

    try {
      // Fetch the existing category to get its current order
      const existingCategory = await prisma.category.findUnique({
        where: { id: categoryId },
        select: { order: true },
      });

      if (!existingCategory) {
        throw new Error("Category not found");
      }
      const currentOrder = existingCategory.order;

      // Update the item being updated with the new order
      const updatedCategory = await prisma.category.update({
        where: { id: categoryId },
        data: { order: newOrder, ...newData },
      });

      // Update the other item with the target order to have the original order
      await prisma.category.updateMany({
        where: { order: newOrder, id: { not: categoryId } },
        data: { order: currentOrder },
      });

      return updatedCategory;
    } catch (error) {
      console.error("Error updating category order:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};
