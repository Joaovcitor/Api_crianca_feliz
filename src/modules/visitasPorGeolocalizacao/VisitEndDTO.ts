export type VisitEndDTO = {
  finalLatitude: number;
  finalLongitude: number;
  nonRealizationReason?: string;
  isBeneficiaryHome?: boolean;
};

export type ObservacaoPlanoVisita = {
  observacao: string;
};
