const dbConfig = require('../config/db.config.js');
const { Sequelize, DataTypes } = require('sequelize');
const BaseModel = require('./base.model.js')(DataTypes);

const conn_sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.DIALECT,
    pool: {
      max: dbConfig.POOL.MAX,
      min: dbConfig.POOL.MIN,
      acquire: dbConfig.POOL.ACQUIRE.acquire,
      idle: dbConfig.POOL.IDLE,
    },
    timezone: '+07:00',
    logging: false,
    // logQueryParameters: true,
    // logging: (...msg) => console.log(msg)
  }
);

const db = {};

db.Sequelize = Sequelize;
db.conn_sequelize = conn_sequelize;

db.tutorials = require('./tutorial.model.js')(
  conn_sequelize,
  Sequelize,
  BaseModel
);

module.exports = db;
