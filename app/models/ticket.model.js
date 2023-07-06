module.exports = (sequelize, Sequelize) => {
  const Ticket = sequelize.define("Ticket", {
    ticketId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderedBy: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    courierNumber: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    deliveryInfoId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    estimatedDeliveryTime: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    quotedPrice: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
  });
  return Ticket;
};
