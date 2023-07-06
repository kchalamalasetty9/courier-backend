module.exports = (sequelize, Sequelize) => {
  const DeliveryInfo = sequelize.define("deliveryInfo", {
    deliveryInfoId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    DeliveryTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
  return DeliveryInfo;
};
