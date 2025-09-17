// CACHE DESATIVADO - Não armazena nem recupera dados
// import { redis } from "../libs/redis";

export class CacheService {
  async set<T>(key: string, data: T, ttlSeconds: number = 3600): Promise<void> {
    try {
      if (data && typeof data === "object" && "then" in data) {
        console.warn("❌ Tentativa de salvar Promise no cache!", key);
        return;
      }

      // Cache desativado - não salva nada
      console.log("🚫 Cache desativado - não salvando:", key);
    } catch (e: unknown) {
      console.warn("Erro ao salvar no cache: ", e);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      // Cache desativado - sempre retorna null (cache miss)
      console.log("🚫 Cache desativado - sempre miss:", key);
      return null;
    } catch (e) {
      console.warn("Erro ao obter do cache: ", e);
      return null;
    }
  }

  async delete(key: string): Promise<void> {
    try {
      // Cache desativado - não há nada para deletar
      console.log("🚫 Cache desativado - nada para deletar:", key);
    } catch (e) {
      console.warn("Erro ao deletar do cache: ", e);
    }
  }

  async deleteByPattern(pattern: string): Promise<void> {
    try {
      // Cache desativado - não há nada para deletar
      console.log("🚫 Cache desativado - nada para deletar por padrão:", pattern);
    } catch (e) {
      console.warn("Erro ao deletar do cache por padrão: ", e);
    }
  }

  async exist(key: string): Promise<boolean> {
    try {
      // Cache desativado - nunca existe
      console.log("🚫 Cache desativado - chave não existe:", key);
      return false;
    } catch (e) {
      console.warn("Erro ao verificar se existe no cache: ", e);
      return false;
    }
  }
  
  async flushAll(): Promise<void> {
    try {
      // Cache desativado - não há nada para limpar
      console.log("🚫 Cache desativado - nada para limpar");
    } catch (e) {
      console.warn("Erro ao limpar todo o cache: ", e);
    }
  }

  async ping(): Promise<boolean> {
    try {
      // Cache desativado - sempre retorna false
      console.log("🚫 Cache desativado");
      return false;
    } catch {
      return false;
    }
  }
}

export const cacheService = new CacheService();
