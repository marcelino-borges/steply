import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email("E-mail inválido"),
});

export const resetPasswordSchema = z.object({
  code: z.string().min(6, "Código deve ter 6 dígitos"),
  newPassword: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});