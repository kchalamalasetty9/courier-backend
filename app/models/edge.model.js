module.exports = (sequelize, Sequelize) => {
  const Edge = sequelize.define("edge", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Edge;
};
