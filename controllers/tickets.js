const Ticket = require("../models/tickets");
const User = require("../models/userModel");

exports.createTicket = async (req, res) => {
  const { title, description, imageUrl, status, priority } = req.body;
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new ticket
    const ticket = await Ticket.create({
      title,
      description,
      imageUrl,
      status,
      priority,
      createdBy: user.id, // Store the user's ID who created the ticket
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({
      message: "Ticket created successfully",
      ticket,
      createdBy: user.name, // You can include the user's name if needed
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.status(200).json({ tickets });
  } catch (error) {
    console.log(error);
  }
};
exports.getSingleTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json({ ticket });
  } catch (error) {
    console.log(error);
  }
};
exports.updateTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const { title, description, imageUrl, status, priority } = req.body;
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    ticket.title = title;
    ticket.description = description;
    ticket.imageUrl = imageUrl;
    ticket.status = status;
    ticket.priority = priority;
    ticket.updatedAt = new Date();
    await ticket.save();
    res.status(200).json({ message: "Ticket updated successfully" });
  } catch (error) {
    console.log(error);
  }
};
exports.deleteTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    await ticket.destroy();
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
