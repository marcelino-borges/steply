import * as z from "zod";

export const signinSchema = z.object({
  email: z
    .string({ required_error: "E-mail obrigatório" })
    .email("E-mail inválido")
    .nonempty("E-mail obrigatório"),
  password: z
    .string({
      required_error: "Senha obrigatória",
      invalid_type_error: "Senha inválida",
    })
    .nonempty("Senha obrigatória"),
});

export type SigninForm = z.infer<typeof signinSchema>;
