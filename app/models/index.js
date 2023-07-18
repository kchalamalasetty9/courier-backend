const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.ticket = require("./ticket.model.js")(sequelize,Sequelize);
db.customer = require("./customer.model.js")(sequelize,Sequelize);
db.courier = require("./courier.model.js")(sequelize,Sequelize);

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);


db.ticket.belongsTo(db.customer, { foreignKey: 'orderedBy', as: 'customer' });
db.customer.hasMany(db.ticket, { foreignKey: 'orderedBy', as: 'tickets' });

db.ticket.belongsTo(db.courier, { foreignKey: 'courierNumber', as: 'courier' });
db.courier.hasMany(db.ticket, { foreignKey: 'courierNumber', as: 'tickets' });


db.courier.belongsTo(db.user, { foreignKey: 'userId', as: 'user' });
db.user.hasOne(db.courier, { foreignKey: 'userId' });


module.exports = db;
