module.exports = (sequelize, Sequelize) => {
  const Courier = sequelize.define("courier", {
    courierNumber: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    courierName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Courier;
};
