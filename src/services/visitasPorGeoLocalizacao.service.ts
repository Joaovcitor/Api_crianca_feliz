import { PrismaClient, type VisitaPorGeolocalizacao } from "@prisma/client";
import type { VisitCreateDTO } from "../dtos/VisitCreateDTO";
import type { VisitEndDTO } from "../dtos/VisitEndDTO";
import type { VisitUpdateDTO } from "../dtos/VisitUpdateDTO";
import type { VisitStartDTO } from "../dtos/VisitStartDTO";
const prisma = new PrismaClient();
export const visitasPorGeoLocalizacaoService = {
  getAll: async (visitadorId: number): Promise<VisitaPorGeolocalizacao[]> => {
    return prisma.visitaPorGeolocalizacao.findMany({
      where: { visitorId: visitadorId },
      include: {
        visitor: true,
        child: true,
        caregiver: true,
      },
    });
  },
  getById: async (id: number): Promise<VisitaPorGeolocalizacao | null> => {
    return prisma.visitaPorGeolocalizacao.findUnique({
      where: { id },
      include: {
        visitor: true,
        child: true,
        caregiver: true,
      },
    });
  },
  marcarVisita: async (
    data: VisitCreateDTO,
    visitadorId: number
  ): Promise<VisitaPorGeolocalizacao> => {
    return prisma.visitaPorGeolocalizacao.create({
      data: {
        scheduledDate: data.scheduledDate,
        planId: data.planId,
        childId: data.childId,
        caregiverId: data.caregiverId,
        visitorId: visitadorId,
      },
      include: {
        visitor: true,
        child: true,
        caregiver: true,
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
    data: VisitEndDTO
  ): Promise<VisitaPorGeolocalizacao> => {
    return prisma.visitaPorGeolocalizacao.update({
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
  },
  visitasMarcadasChild: async (
    childId: number
  ): Promise<VisitaPorGeolocalizacao[]> => {
    return prisma.visitaPorGeolocalizacao.findMany({
      where: { childId: childId },
      include: {
        visitor: true,
        child: true,
      },
    });
  },
  update: async (
    id: number,
    data: VisitUpdateDTO
  ): Promise<VisitaPorGeolocalizacao> => {
    return prisma.visitaPorGeolocalizacao.update({
      where: { id },
      data: {
        isFakeVisit: data.isFakeVisit,
        isValidationPending: data.isValidationPending,
        invalidationReason: data.invalidationReason,
      },
    });
  },
};
