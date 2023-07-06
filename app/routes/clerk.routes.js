module.exports = (app) => {
  const clerk = require("../controllers/clerk.controller.js");

  var router = require("express").Router();

  router.post('/clerks', clerk.create);
  router.get('/clerks', clerk.readAll );
  router.get('/clerks/:id',clerk.get );
  router.put('/clerks/:id', clerk.update);
  router.delete('/clerks/:id', clerk.delete);

  app.use("/courierapi", router);
};



