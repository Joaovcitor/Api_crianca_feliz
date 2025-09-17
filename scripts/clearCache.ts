// scripts/clearCache.ts
import { redis } from "../src/libs/redis";

async function clearVisitsCache() {
  try {
    // Encontrar todas as chaves de visitas
    const keys = await redis.keys("visits:*");

    if (keys.length > 0) {
      console.log("🗑️ Encontradas chaves para deletar:", keys);
      await redis.del(...keys);
      console.log("✅ Cache limpo com sucesso!");
    } else {
      console.log("ℹ️ Nenhuma chave de visits encontrada");
    }
  } catch (error) {
    console.error("❌ Erro ao limpar cache:", error);
  } finally {
    await redis.quit();
  }
}

// Executar
clearVisitsCache();
