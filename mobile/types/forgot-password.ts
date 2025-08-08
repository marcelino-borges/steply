import { z } from "zod";
import { forgotPasswordSchema, resetPasswordSchema } from "@/utils/schemas/forgot-password";

export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;