const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.NODE_ENV === 'test') {
  // Configuração para o ambiente de teste
  require("dotenv").config({ path: '.env.test' });
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: process.env.DB_STORAGE,
    logging: false, // Desativa logs de SQL para testes
  });
} else {
  // Configuração para o ambiente de produção
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: 3306,
      dialect: process.env.DB_DIALECT,
      timezone: "-03:00",
      dialectOptions: {
        connectTimeout: 60000, // 60 segundos
      },
    }
  );
}

// Autentica e tenta deletar a tabela 'usuarios_backup'
async function initDB() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Deletar a tabela 'usuarios_backup', se existir
    await sequelize.getQueryInterface().dropTable('usuarios_backup');
    console.log("Tabela 'usuarios_backup' deletada com sucesso");

  } catch (err) {
    console.error("Unable to connect to the database or drop table:", err);
  }
}

initDB();

module.exports = sequelize;
