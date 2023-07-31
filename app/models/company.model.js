module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define('company', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price_per_block: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    time_per_block: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    ontime_bonus_percentage: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    office_northsouth_street: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    office_eastwest_street: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Company;
  }
  