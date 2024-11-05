require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "pcf-api",
      script: "./index.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: process.env.NODE_ENV || "development",
        DB_NAME: process.env.DB_NAME,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT || 3306,
        DB_DIALECT: process.env.DB_DIALECT || "mysql"
      },
      env_production: {
        NODE_ENV: "production",
        DB_NAME: process.env.PROD_DB_NAME,
        DB_USER: process.env.PROD_DB_USER,
        DB_PASSWORD: process.env.PROD_DB_PASSWORD,
        DB_HOST: process.env.PROD_DB_HOST,
        DB_PORT: process.env.PROD_DB_PORT || 3306,
        DB_DIALECT: process.env.PROD_DB_DIALECT || "mysql"
      }
    }
  ]
};