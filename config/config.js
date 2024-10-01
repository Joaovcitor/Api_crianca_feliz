require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "database_development",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mariadb",
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: "database_test", // Alterar conforme necessário
    host: process.env.DB_HOST || "localhost",
    dialect: "sqlite",
  },
  production: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: "database_production", // Alterar conforme necessário
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
  },
};
