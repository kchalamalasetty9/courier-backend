module.exports = (app) => {
  const UserRegistration = require("../controllers/userRegistration.controller.js");
  const { authenticateRoute } = require("../authentication/authentication");
  var router = require("express").Router();

  // Create a new User
  router.post("/user-registrations/", UserRegistration.create);

  // Retrieve all Users
  router.get("/user-registrations/", UserRegistration.findAll);

  // Retrieve a single User with id
  router.get("/user-registrations/:id", UserRegistration.findOne);

  // Update a User with id
  router.put("/user-registrations/:id", UserRegistration.update);

  // Delete a User with id
  router.delete("/user-registrations/:id", UserRegistration.delete);

  // Delete all User
  router.delete("/user-registrations/", UserRegistration.deleteAll);

  // Accept a single User with id
  router.put("/user-registrations/:id/accept", UserRegistration.accept);

  // Decline a single User with id
  router.put("/user-registrations/:id/decline", UserRegistration.decline);

  app.use("/courierapi", router);
};
