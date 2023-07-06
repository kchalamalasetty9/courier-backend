module.exports = (app) => {
  const deliveryInfo = require("../controllers/deliveryInfo.controller.js");

  var router = require("express").Router();

  router.post("/deliveryInfo", deliveryInfo.create);
  router.get("/deliveryInfo", deliveryInfo.readAll);
  router.get("/deliveryInfo/:id", deliveryInfo.get);
  router.put("/deliveryInfo/:id", deliveryInfo.update);
  router.delete("/deliveryInfo/:id", deliveryInfo.delete);

  app.use("/courierapi", router);
};
