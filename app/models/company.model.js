module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define('company', {
    key: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    value: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Company;
  }
  