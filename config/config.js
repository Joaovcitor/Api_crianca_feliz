require("dotenv").config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || "database_development",
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: "database_test",
    host: process.env.DB_HOST || "localhost",
    dialect: "sqlite",
    storage: ":memory",
  },
  production: {
    username: process.env.PROD_DB_USER || "root",
    password: process.env.PROD_DB_PASSWORD || null,
    database: "pcf_prod",
    host: process.env.PROD_DB_HOST || "localhost",
    dialect: "mariadb",
  },
};
