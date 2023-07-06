module.exports = (sequelize, Sequelize) => {

const Customer = sequelize.define('customer', {
  customerNumber: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  customerName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Location: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  deliveryInstructions: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});
return Customer;
}
