const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

console.log("NODE_ENV atual:", process.env.NODE_ENV); // Adicione esta linha
console.log("DB_DIALECT do .env:", process.env.DB_DIALECT); // E esta também

if (process.env.NODE_ENV === "production") {
  // Configuração para o ambiente de PRODUÇÃO
  // Idealmente, use uma URL de conexão (DATABASE_URL) para ambientes de produção.
  // Isso é mais seguro e padronizado em serviços de hospedagem como Heroku, Vercel, etc.
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "A variável de ambiente DATABASE_URL é obrigatória para o ambiente de produção."
    );
  }
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres", // Ou outro dialeto, dependendo do seu banco em produção
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Pode ser necessário para alguns provedores de hospedagem que usam certificados auto-assinados.
      },
      connectTimeout: 60000, // 60 segundos
    },
    logging: false, // Desativa logs de SQL em produção para performance e segurança
    timezone: "-03:00",
  });
} else if (process.env.NODE_ENV === "development") {
  // Configuração para o ambiente de DESENVOLVIMENTO
  // Usa variáveis de ambiente para facilitar a configuração local.
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
      dialectOptions: {
        connectTimeout: 60000,
      },
    }
  );
} else if (process.env.NODE_ENV === "test") {
  // Configuração para o ambiente de TESTE
  // Usa um banco de dados SQLite em memória ou em arquivo para agilidade.
  require("dotenv").config({ path: ".env.test" });
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: process.env.DB_STORAGE || ":memory:", // Padrão para em memória se não houver um caminho
    logging: false, // Desativa logs de SQL para testes
  });
} else {
  // Caso o ambiente não seja especificado, o código não executa a conexão.
  throw new Error(
    "A variável de ambiente NODE_ENV não está definida. Por favor, defina-a como 'production', 'development' ou 'test'."
  );
}

module.exports = sequelize;
