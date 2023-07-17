module.exports = (sequelize, Sequelize) => {
  const Vertex = sequelize.define("vertex", {
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
  return Vertex;
};
