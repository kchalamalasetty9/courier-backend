const Ticket = require('../models/ticket.model');

// Create a ticket
exports.create = async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);
    res.json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
};

// Read all tickets
exports.readAll =  async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
};

// Read a ticket by ID
exports.get =  async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) {
      res.status(404).json({ error: 'Ticket not found' });
    } else {
      res.json(ticket);
    }
  } catch (err) {
    console.error(err);
    res.status(500, { error: 'Failed to fetch ticket' });
  }
};

// Update a ticket
exports.update = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) {
      res.status(404).json({ error: 'Ticket not found' });
    } else {
      await ticket.update(req.body);
      res.json(ticket);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update ticket' });
  }
};

// Delete a ticket
exports.delete = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) {
      res.status(404).json({ error: 'Ticket not found' });
    } else {
      await ticket.destroy();
      res.json({ message: 'Ticket deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete ticket' });
  }
};