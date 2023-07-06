module.exports = (app) => {
  const customer = require("../controllers/customer.controller.js");

  var router = require("express").Router();

  router.post("/customers", customer.create);
  router.get("/customers", customer.readAll);
  router.get("/customers/:id", customer.get);
  router.put("/customers/:id", customer.update);
  router.delete("/customers/:id", customer.delete);

  app.use("/courierapi", router);
};
