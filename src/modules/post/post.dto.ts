import type { Prisma } from "@prisma/client";

export interface PostCreateDto {
  title: string;
  content: Prisma.JsonValue;
}
