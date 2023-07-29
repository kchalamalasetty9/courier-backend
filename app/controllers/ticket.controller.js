const db = require("../models");
const Ticket = db.ticket;
const Customer = db.customer;
const Courier = db.courier;

// Create a ticket
exports.create = async (req, res) => {
  try {
    const requestBody = req.body;
    let orderedBy = 0;
    let orderedTo = 0;

    if (requestBody.isNewOrderBy) {
      const orderedByCustomer = await Customer.create(requestBody.newOrderedBy);
      console.log(orderedByCustomer);
      orderedBy = orderedByCustomer.dataValues.customerNumber;
    } else {
      orderedBy = requestBody.orderedBy.customerNumber;
    }

    if (requestBody.isNewOrderTo) {
      const orderedToCustomer = await Customer.create(requestBody.newOrderedTo);
      console.log(orderedToCustomer);
      orderedTo = orderedToCustomer.dataValues.customerNumber;
    } else {
      orderedTo = requestBody.orderedTo.customerNumber;
    }

    const ticket = {
      orderedBy,
      orderedTo,
      courierNumber: requestBody.selectedCourier.courierNumber,
      status: "pending",
      requestedPickupTime: requestBody.requestedPickupTime
    };

    const response = await Ticket.create(ticket);
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create ticket" });
  }
};

// Read all tickets
exports.readAll = async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      include: [
        { model: Customer, as: 'orderedByCustomer' },
        { model: Customer, as: 'orderedToCustomer' },
        { model: Courier, as: 'courier'}
      ]
    });
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
};

// Read a ticket by ID
exports.get = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
    } else {
      res.json(ticket);
    }
  } catch (err) {
    console.error(err);
    res.status(500, { error: "Failed to fetch ticket" });
  }
};

// Update a ticket
exports.update = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
    } else {
      await ticket.update({ ...req.body, courierNumber: req.body.selectedCourier.courierNumber});
      res.json(ticket);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update ticket" });
  }
};

// Delete a ticket
exports.delete = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
    } else {
      await ticket.destroy();
      res.json({ message: "Ticket deleted successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete ticket" });
  }
};
