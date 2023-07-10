module.exports = (sequelize, Sequelize) => {
  const Courier = sequelize.define("courier", {
    courierNumber: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    courierName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Courier;
};

