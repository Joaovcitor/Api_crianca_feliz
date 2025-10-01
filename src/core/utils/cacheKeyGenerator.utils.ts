// utils/cacheKeyGenerator.utils.ts
export class CacheKeyGenerator {
  static userVisits(userId: number, date: Date): string {
    const dateStr = date.toISOString().split("T")[0];
    return `visits:user:${userId}:date:${dateStr}`;
  }

  // Para visitas específicas
  static visitById(visitId: number): string {
    return `visit:${visitId}`;
  }

  // Para visitas de uma criança
  static childVisits(childId: number): string {
    return `visits:child:${childId}`;
  }

  // Para visitas de um visitador
  static visitorVisits(visitorId: number): string {
    return `visits:visitor:${visitorId}`;
  }
}
