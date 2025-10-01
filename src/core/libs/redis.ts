// REDIS TEMPORARIAMENTE DESATIVADO
// Comentando toda a configuração do Redis para desativar temporariamente

/*
import Redis from "ioredis";

export const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || "6379"),
  password: process.env.REDIS_PASSWORD || undefined,
  retryStrategy: (times) => Math.min(times * 50, 2000),
  connectTimeout: 10000,
  maxRetriesPerRequest: 1,
});

redis.on("connect", () => {
  console.log("✅ conectado ao Redis com sucesso!!");
});

redis.on("error", (err) => {
  console.error("❌ erro ao se conectar com o Redis", err);
});

redis.on("close", () => {
  console.log("🔌 Conexão com Redis fechada");
});

redis.on("ready", () => {
  console.log("🚀 Redis pronto para operações");
});
*/

// Exportação vazia para manter compatibilidade (não será usada)
export const redis = null;
