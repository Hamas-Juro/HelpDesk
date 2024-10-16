const { Category, Ticket, TicketCategory } = require("../models");

exports.createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const category = await Category.create({
      name,
      description,
    });

    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create category", error: error.message });
  }
};

exports.assignTicketToCategory = async (req, res) => {
  const { ticketId, categoryId } = req.body;

  try {
    // Fetch the ticket and category to ensure they exist
    const ticket = await Ticket.findByPk(ticketId);
    const category = await Category.findByPk(categoryId);

    if (!ticket || !category) {
      return res.status(404).json({ message: "Ticket or Category not found" });
    }

    // Assign the ticket to the category
    await ticket.addCategory(category); // Sequelize auto-adds helper method `addCategory` for many-to-many associations

    res
      .status(200)
      .json({ message: "Ticket assigned to category successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to assign ticket to category",
      error: error.message,
    });
  }
};

exports.getAllCategoriesWithTickets = async (req, res) => {
  try {
    // Fetch all categories and include the related tickets
    const categories = await Category.findAll({
      include: [
        {
          model: Ticket,
          through: { attributes: [] }, // Exclude the junction table attributes
        },
      ],
    });

    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve categories with tickets",
      error: error.message,
    });
  }
};
