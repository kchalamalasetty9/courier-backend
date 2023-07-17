module.exports = (app) => {
  const ticket = require("../controllers/ticket.controller.js");

  var router = require("express").Router();

  router.post("/tickets",ticket.create);
  router.get("/tickets",ticket.readAll);
  router.get("/tickets/:id",ticket.get);
  router.put("/tickets/:id",ticket.update);
  router.delete("/tickets/:id",ticket.delete);

  app.use("/courierapi", router);
};
