module.exports = (app) => {
  const map = require("../controllers/map.controller.js");

  var router = require("express").Router();

  router.post("/maps/create-map", map.createMap);
  router.get("/maps", map.getMap);

  router.post("/vertices", map.postVertices);
  router.get("/vertices", map.getVertices);
  router.get("/vertices/:name", map.getVerticesByName);
  router.put("/vertices/:name", map.putVertices);
  router.delete("/vertices/:name", map.deleteVertices);
  router.post("/edges", map.postEdge);
  router.get("/edges", map.getEdges);
  router.get("/edges/:id", map.getEdgeById);
  router.put("/edges/:id", map.putEdge);
  router.delete("/edges/:id", map.deleteEdge);

  app.use("/courierapi", router);
};
