module.exports = (sequelize, Sequelize) => {

const Customer = sequelize.define('customer', {
  customerNumber: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customerName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  avenue: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  street: {
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
