import * as z from "zod";
export const emailUpdate = z.object({
  id: z.number().positive("Id invalido!"),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório!"),
});
export const resetPassword = z.object({
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});
export const loginSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório!"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});
