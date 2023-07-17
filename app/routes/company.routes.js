module.exports = (app) => {
  const company = require("../controllers/company.controller.js");

  var router = require("express").Router();

  router.post("/companies", company.createCompany);
  router.get("/companies", company.getAllCompanies);
  router.get("/companies/:id", company.getCompanyById);
  router.put("/companies/:id", company.updateCompany);
  router.delete("/companies/:id", company.deleteCompany);

  app.use("/courierapi", router);
};
