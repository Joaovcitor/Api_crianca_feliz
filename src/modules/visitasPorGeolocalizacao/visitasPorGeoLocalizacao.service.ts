import { PrismaClient, type VisitaPorGeolocalizacao } from "@prisma/client";
import type { VisitCreateDTO } from "./VisitCreateDTO";
import type { ObservacaoPlanoVisita, VisitEndDTO } from "./VisitEndDTO";
import type { VisitUpdateDTO } from "./VisitUpdateDTO";
import type { VisitStartDTO } from "./VisitStartDTO";
import { cacheService } from "../../services/cache.service";
import { CacheKeyGenerator } from "../../core/utils/cacheKeyGenerator.utils";
import { BadRequestError } from "../../core/errors/appErrors";
const prisma = new PrismaClient();
export const visitasPorGeoLocalizacaoService = {
  getAll: async (visitadorId: number): Promise<VisitaPorGeolocalizacao[]> => {
    const cacheKey = CacheKeyGenerator.visitorVisits(visitadorId);
    const cached = await cacheService.get<VisitaPorGeolocalizacao[]>(cacheKey);
    if (cached) return cached;
    const visits = await prisma.visitaPorGeolocalizacao.findMany({
      where: { visitorId: visitadorId },
      include: {
        visitor: true,
        child: true,
        caregiver: true,
      },
    });
    await cacheService.set(cacheKey, visits, 3600);
    return visits;
  },
  getById: async (id: number): Promise<VisitaPorGeolocalizacao | null> => {
    return prisma.visitaPorGeolocalizacao.findUnique({
      where: { id },
      include: {
        visitor: true,
        child: true,
        caregiver: true,
        visitPlan: true,
      },
    });
  },
  iniciarVisita: async (
    id: number,
    data: VisitStartDTO
  ): Promise<VisitaPorGeolocalizacao> => {
    return prisma.visitaPorGeolocalizacao.update({
      where: { id },
      data: {
        latitude: data.latitude,
        longitude: data.longitude,
        isVisitInProgress: true,
      },
    });
  },
  finalizarVisita: async (
    id: number,
    data: VisitEndDTO,
    observacao: ObservacaoPlanoVisita
  ): Promise<VisitaPorGeolocalizacao> => {
    const result = await prisma.$transaction(async (tsx) => {
      const visita = await tsx.visitaPorGeolocalizacao.findUnique({
        where: { id },
      });
      if (!visita) {
        throw new BadRequestError("Visita não encontrada!");
      }
      if (!observacao.observacao) {
        throw new BadRequestError("Observação é obrigatória!");
      }
      const planoDeVisita = await tsx.planoDeVisitas.update({
        where: { id: visita?.planId! },
        data: {
          observation: observacao.observacao,
        },
      });
      if (!planoDeVisita) {
        throw new BadRequestError("Plano de visita não encontrado!");
      }

      return await tsx.visitaPorGeolocalizacao.update({
        where: { id },
        data: {
          finalLatitude: data.finalLatitude,
          finalLongitude: data.finalLongitude,
          nonRealizationReason: data.nonRealizationReason,
          isBeneficiaryHome: data.isBeneficiaryHome,
          isFinished: true,
          isVisitInProgress: false,
        },
      });
    });
    return result;
  },
  visitasMarcadasChild: async (
    childId: number
  ): Promise<VisitaPorGeolocalizacao[]> => {
    const cacheKey = CacheKeyGenerator.childVisits(childId);
    const cached = await cacheService.get<VisitaPorGeolocalizacao[]>(cacheKey);
    if (cached) {
      console.log(
        "✅ Cache hit - Retornando",
        cached.length,
        "visitas do cache"
      );
      return cached;
    }

    console.log(
      "❌ Cache miss - buscando visitas da criança do banco:",
      childId
    );
    const visitas = await prisma.visitaPorGeolocalizacao.findMany({
      where: { childId: childId, isFinished: false },
      include: {
        visitor: true,
        child: true,
      },
    });
    await cacheService.set(cacheKey, visitas, 3600);
    return visitas;
  },
  visitasMarcadasPregnant: async (
    pregnantId: number
  ): Promise<VisitaPorGeolocalizacao[]> => {
    // const cacheKey = CacheKeyGenerator.childVisits(pregnantId);
    // const cached = await cacheService.get<VisitaPorGeolocalizacao[]>(cacheKey);
    // if (cached) {
    //   console.log(
    //     "✅ Cache hit - Retornando",
    //     cached.length,
    //     "visitas do cache"
    //   );
    //   return cached;
    // }

    // console.log(
    //   "❌ Cache miss - buscando visitas da criança do banco:",
    //   childId
    // );
    const visitas = await prisma.visitaPorGeolocalizacao.findMany({
      where: { caregiverId: pregnantId, isFinished: false },
      include: {
        visitor: true,
        caregiver: true,
      },
    });
    // await cacheService.set(cacheKey, visitas, 3600);
    return visitas;
  },
  update: async (
    id: number,
    data: VisitUpdateDTO
  ): Promise<VisitaPorGeolocalizacao> => {
    const visita = await prisma.visitaPorGeolocalizacao.update({
      where: { id },
      data: {
        isFakeVisit: data.isFakeVisit,
        isValidationPending: data.isValidationPending,
        invalidationReason: data.invalidationReason,
      },
    });
    const cacheKey = CacheKeyGenerator.childVisits(Number(visita.childId));
    await cacheService.delete(cacheKey);
    return visita;
  },
  getAllForCoordenador: async (): Promise<VisitaPorGeolocalizacao[]> => {
    return prisma.visitaPorGeolocalizacao.findMany({
      include: {
        visitor: true,
        child: true,
        caregiver: true,
      },
    });
  },
};
