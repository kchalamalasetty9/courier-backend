module.exports = (sequelize, Sequelize) => {
  const Ticket = sequelize.define("ticket", {
    ticketId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    estimatedDeliveryTime: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    quotedPrice: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    status: { //pending, driver-left-facility, driver-picked-up-order, out-for-delivery, delivered, canceled
      type: Sequelize.STRING,
      allowNull: false,
    },
    requestedPickupTime: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    requestedPickupLocation: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    dropOffLocation: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    distance: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    onTimeBonus: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    estimatedStartTime: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    estimatedPickupTime: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    actualStartTime: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    actualPickupTime: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    actualDeliveryTime: {
      type: Sequelize.DATE,
      allowNull: true,
    },

    routeToPickupFromOffice: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    routeToDeliveryFromPickup: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    routeToOfficeFromDelivery: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    courierNumber: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  });
  return Ticket;
};
