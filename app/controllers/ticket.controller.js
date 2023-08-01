const db = require("../models");
const { Graph } = require("../utils/Graph");
const Ticket = db.ticket;
const Customer = db.customer;
const Courier = db.courier;
const Vertex = db.vertex;
const Edge = db.edge;

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
      courierNumber: requestBody?.selectedCourier?.courierNumber,
      status: "pending",
      requestedPickupTime: requestBody.requestedPickupTime,
      estimatedStartTime: requestBody.requestedPickupTime,
      quotedPrice: requestBody.quotedPrice,
      estimatedDeliveryTime: requestBody.estimatedDeliveryTime,
      estimatedPickupTime: requestBody.estimatedPickupTime,
      requestedPickupLocation: requestBody.requestedPickupLocation,
      dropOffLocation: requestBody.dropOffLocation,
      distance: requestBody.distance,
      routeToDeliveryFromPickup: requestBody.routeToDeliveryFromPickup,
      routeToOfficeFromDelivery: requestBody.routeToOfficeFromDelivery,
      routeToPickupFromOffice: requestBody.routeToPickupFromOffice,
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
        { model: Customer, as: "orderedByCustomer" },
        { model: Customer, as: "orderedToCustomer" },
        { model: Courier, as: "courier" },
      ],
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
      await ticket.update({
        ...req.body,
        courierNumber: req.body.selectedCourier.courierNumber,
      });
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

exports.getEstimatePriceAndInstructions = async (req, res) => {
  try {
    const sourceNode = req.query.sourceNode;
    const destinationNode = req.query.destinationNode;
    const officeNode = "C3"; // TODO: Get from companyInfoTable
    let g = new Graph();
    const vertices = await Vertex.findAll({ where: null });
    const edges = await Edge.findAll({ where: null });
    vertices.map((x) => g.addVertex(x.dataValues.name));
    edges.map((x) =>
      g.addEdge(x.dataValues.sourceVertexId, x.dataValues.destinationVertexId)
    );

    const officeSPT = g.shortestPathTraversal(officeNode);

    const sourceSPT = g.shortestPathTraversal(sourceNode);
    const destinationSPT = g.shortestPathTraversal(destinationNode);
    res.json({
      o: officeSPT[sourceNode],
      s: sourceSPT[destinationNode],
      d: destinationSPT[officeNode],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDeliveryStatus = async (req, res) => {
  try {
    const requestBody = req.body;
    const updatedFields = {};
    if (requestBody.status) {
      updatedFields.status = requestBody.status;
      switch (requestBody.status) {
        //         driver-left-facility -> ast, null,null
        // driver-picked-up-order -> ast, apt, null
        // Delivered -> ast->apt ->adt
        case "pending":
          updatedFields.actualStartTime = null;
          updatedFields.actualPickupTime = null;
          updatedFields.actualDeliveryTime = null;
          break;
        case "driver-left-facility":
          updatedFields.actualStartTime = new Date().toISOString();
          updatedFields.actualPickupTime = null;
          updatedFields.actualDeliveryTime = null;
          break;
        case "driver-picked-up-order":
          updatedFields.actualPickupTime = new Date().toISOString();
          updatedFields.actualDeliveryTime = null;
          break;
        case "delivered":
          updatedFields.actualDeliveryTime = new Date().toISOString();
          if (
            requestBody.estimatedDeliveryTime >=
            updatedFields.actualDeliveryTime
          ) {
            updatedFields.onTimeBonus = "yes";
          } else {
            updatedFields.onTimeBonus = "no";
          }
          break;
        case "canceled":
          updatedFields.actualStartTime = null;
          updatedFields.actualPickupTime = null;
          updatedFields.actualDeliveryTime = null;
          updatedFields.onTimeBonus = "no";
          updatedFields.status = "canceled";
          break;

        default:
          break;
      }
    }
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
    } else {
      await ticket.update({
        ...updatedFields,
      });
      res.json(ticket);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update ticket" });
  }
};

exports.generateCompanyReport = async (req, res) => {
  try {
    // Fetch the company report data
    const reportData = await Ticket.findAll({
      attributes: [
        "orderedBy",
        [db.Sequelize.fn("COUNT", db.Sequelize.col("ticketId")), "numTickets"],
        [
          db.Sequelize.fn("SUM", db.Sequelize.col("quotedPrice")),
          "totalBilling",
        ],
      ],
      include: [
        {
          model: Customer,
          as: "orderedByCustomer",
          attributes: ["customerName"],
        },
      ],
      group: ["orderedBy"],
    });

    // Process the data to prepare the report
    const companyReport = reportData.map((entry) => ({
      orderedBy: entry.orderedByCustomer.customerName,
      numTickets: entry.dataValues.numTickets,
      totalBilling: entry.dataValues.totalBilling,
    }));

    res.json(companyReport);
  } catch (error) {
    console.error("Error generating company report:", error);
    res.status(500).json({ error: "Failed to generate company report" });
  }
};

exports.courierBonusReport = async (req, res) => {
  const courierNumber = req.params.courierNumber;

  try {
    
    const courierBonuses = await db.ticket.findAll({
      where: {
        courierNumber: courierNumber,
      },
      include: [
        {
          model: db.customer,
          as: "orderedByCustomer",
          attributes: ["customerNumber", "customerName"], 
        },
        {
          model: db.customer,
          as: "orderedToCustomer",
          attributes: ["customerNumber", "customerName"], 
        },
      ],
    });

    res.json(courierBonuses);
  } catch (error) {
    console.error("Error fetching courier bonuses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
