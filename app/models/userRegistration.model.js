module.exports = (sequelize, Sequelize) => {
  const UserRegistration = sequelize.define("userRegistration", {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userType: { // admin, courier, clerk
      type: Sequelize.STRING,
      allowNull: false,
    }
  });

  return UserRegistration;
};
