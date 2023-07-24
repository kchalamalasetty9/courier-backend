module.exports = (app) => {
  const map = require("../controllers/map.controller.js");

  var router = require("express").Router();

  router.post("/maps/create-map", map.createMap);
  router.get("/maps", map.getMap);

  app.use("/courierapi", router);
};
