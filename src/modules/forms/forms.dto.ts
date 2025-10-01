import type { TiposFormularios } from "@prisma/client";
type JsonObject = Record<string, any>;

export interface CreateFormDto {
  tipo: TiposFormularios;
  etapa: number;
  estrutura?: JsonObject;
}
