import * as z from "zod";
export const emailUpdate = z.object({
  id: z.number().positive("Id invalido!"),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório!"),
});
