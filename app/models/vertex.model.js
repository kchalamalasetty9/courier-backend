module.exports = (sequelize, Sequelize) => {
  const Vertex = sequelize.define("vertex", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
  });
  return Vertex;
};
