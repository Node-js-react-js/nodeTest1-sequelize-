const config = require('./config.js');
const mysql = require('mysql2');
const Sequelize = require('sequelize');
module.exports = db = {};
// create db if it doesn't already exist
const { host, port, user, password, database } = config.database;
const pool = mysql.createPool({ host, port, user, password });
pool.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
// connect to db
const sequelize = new Sequelize(database, user, password, {
    dialect: 'mysql',
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
}
);
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.tutorials = require("./app/models/tutorial.model")(sequelize, Sequelize);
db.comments = require("./app/models/comment.model.js")(sequelize, Sequelize);
db.tutorials.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.tutorials, {
    foreignKey: "tutorialId",
    as: "tutorial",
});
// sync all models with database
sequelize.sync();