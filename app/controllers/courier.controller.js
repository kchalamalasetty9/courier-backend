const db = require("../models");
const Courier = db.courier;
const Customer = db.customer;

// Create a courier
exports.create = async (req, res) => {
  try {
    const courier = await Courier.create(req.body);
    res.json(courier);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create courier" });
  }
};

// Read all couriers
exports.readAll = async (req, res) => {
  try {
    const couriers = await Courier.findAll({ where: null });
    res.json(couriers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch couriers" });
  }
};

// Read a courier by ID
exports.get = async (req, res) => {
  try {
    const courier = await Courier.findByPk(req.params.id);
    if (!courier) {
      res.status(404).json({ error: "Courier not found" });
    } else {
      res.json(courier);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch courier" });
  }
};

// Update a courier
exports.update = async (req, res) => {
  try {
    const courier = await Courier.findByPk(req.params.id);
    if (!courier) {
      res.status(404).json({ error: "Courier not found" });
    } else {
      await courier.update(req.body);
      res.json(courier);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update courier" });
  }
};

// Delete a courier
exports.delete = async (req, res) => {
  try {
    const courier = await Courier.findByPk(req.params.id);
    if (!courier) {
      res.status(404).json({ error: "Courier not found" });
    } else {
      await courier.destroy();
      db.user.destroy({
        where: { id: courier.userId },
      });
      res.json({ message: "Courier deleted successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete courier" });
  }
};

exports.availableCourier = async (req, res) => {
  try {
    const occupiedCouriers = await db.courier.findAll({
      include: [
        {
          model: db.ticket,
          as: "tickets",
          where: { status: { [db.Sequelize.Op.ne]: "delivered" }, [db.Sequelize.Op.ne]: "canceled"  }, 
          required: false,
        },
      ],
      where: { "$tickets.ticketId$": { [db.Sequelize.Op.ne]: null } },
    });

    const couriers = await Courier.findAll({ where: null });

    const availableCouriers = couriers.filter(
      (e) => !occupiedCouriers.some((o) => o.courierNumber === e.courierNumber)
    );

    res.json(availableCouriers);
  } catch (error) {
    console.error("Error fetching available couriers:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getTicketsByUserId = async (req, res) => {
  try {
    const c = await db.courier.findOne({
      where: {
        userId: req.params.userId,
      },
    });

    if (!c) {
      // If the courier is not found, return an empty array or throw an error
      return [];
    }
    const tickets = await db.ticket.findAll({
      where: {
        courierNumber: c.courierNumber,
      },
      include: [
        { model: Customer, as: "orderedByCustomer" },
        { model: Customer, as: "orderedToCustomer" },
        { model: Courier, as: "courier" },
      ],
    });
    res.json(tickets);
  } catch (error) {
    console.error("Error fetching tickets by courier ID:", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAvaliableTicketsByUserId = async (req, res) => {
  try {
    const tickets = await db.ticket.findAll({
      where: {
        courierNumber: { [db.Sequelize.Op.eq]: null },
      },
      include: [
        { model: Customer, as: "orderedByCustomer" },
        { model: Customer, as: "orderedToCustomer" },
        { model: Courier, as: "courier" },
      ],
    });
    res.json(tickets);
  } catch (error) {
    console.error("Error fetching tickets by courier ID:", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.takeOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const courier = await db.courier.findOne({
      where: {
        userId: req.params.userId,
      },
    });

    const ticket = await db.ticket.findByPk(orderId);
    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
    } else {
      await ticket.update({
        ...req.body,
        courierNumber: courier.courierNumber,
      });
      res.json(ticket);
    }
  } catch (error) {
    console.error("Error fetching tickets by courier ID:", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
};
