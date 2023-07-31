module.exports = (app) => {
  const courier = require("../controllers/courier.controller.js");

  var router = require("express").Router();

  router.post("/couriers", courier.create);
  router.get("/couriers", courier.readAll);
  router.get("/couriers/:userId/tickets", courier.getTicketsByUserId);
  router.get("/couriers/:userId/available-tickets", courier.getAvaliableTicketsByUserId);
  router.get("/available-couriers", courier.availableCourier);
  router.get("/couriers/:id", courier.get);
  router.put("/couriers/:id", courier.update);
  router.delete("/couriers/:id", courier.delete);

  app.use("/courierapi", router);
};
