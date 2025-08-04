import * as z from "zod";

export const signUpSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string({ required_error: t("forms.nameRequired") })
      .nonempty(t("forms.nameRequired")),
    email: z
      .string({ required_error: t("forms.emailRequired") })
      .email(t("forms.emailInvalid"))
      .nonempty(t("forms.emailRequired")),
    phone: z
      .string({ required_error: t("forms.phoneRequired") })
      .nonempty(t("forms.phoneRequired")),
    countryCode: z
      .string({ required_error: t("forms.countryRequired") })
      .max(2),
    password: z.string({
      required_error: t("forms.passwordRequired"),
      invalid_type_error: t("forms.passwordInvalid"),
    }),
    confirmPassword: z.string({
      required_error: t("forms.passwordRequired"),
      invalid_type_error: t("forms.passwordInvalid"),
    }),
  });

export type SignUpForm = z.infer<ReturnType<typeof signUpSchema>>;
