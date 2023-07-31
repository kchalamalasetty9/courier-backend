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
// TODO:
// Estimated Start Time:
// Estimated Pickup Time:
// Actual Start Time:
// Actual Pickup Time:
// Actual Delivery Time:

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
      d: destinationSPT[officeNode]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
