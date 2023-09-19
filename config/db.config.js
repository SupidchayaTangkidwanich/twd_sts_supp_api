module.exports = {
  HOST: process.env.DB_HOST,
  PORT: process.env.PORT,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASS,
  DB: process.env.DB_NAME,
  DIALECT: 'mssql',
  POOL: {
    MAX: 5,
    MIN: 0,
    ACQUIRE: 30000,
    IDLE: 10000,
  },
};