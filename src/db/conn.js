const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

console.log("NODE_ENV atual:", process.env.NODE_ENV);
console.log("DB_DIALECT do .env:", process.env.DB_DIALECT);

if (process.env.NODE_ENV === "production") {
  // CONFIGURAÇÃO DE PRODUÇÃO AJUSTADA
  sequelize = new Sequelize(
    process.env.DB_DATABASE, // Usa o nome do banco do .env
    process.env.DB_USERNAME, // Usa o usuário do .env
    process.env.DB_PASSWORD, // Usa a senha do .env
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432,
      dialect: process.env.DB_DIALECT || "postgres",
      logging: false, // Desativa logs em produção
      timezone: "-03:00",
    }
  );
} else if (process.env.NODE_ENV === "development") {
  sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432,
      dialect: process.env.DB_DIALECT,
      timezone: "-03:00",
      logging: console.log,
    }
  );
} else {
  // Caso o ambiente não seja especificado
  throw new Error(
    "A variável de ambiente NODE_ENV não está definida. Por favor, defina-a como 'production' ou 'development'."
  );
}

module.exports = sequelize;
