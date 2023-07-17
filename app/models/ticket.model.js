module.exports = (sequelize, Sequelize) => {
  const Ticket = sequelize.define("ticket", {
    ticketId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderedBy: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    courierNumber: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    estimatedDeliveryTime: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    quotedPrice: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    orderedTo: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
  });
  return Ticket;
};
