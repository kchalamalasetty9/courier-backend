module.exports = (sequelize, Sequelize) => {
  const Clerk = sequelize.define("clerk", {
    clerkId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    clerkName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Clerk;
};
