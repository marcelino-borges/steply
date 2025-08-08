import { EnumLike, z } from "zod";

import { Lang, t } from "@/core/application/locales";

export const enumSchema = <TEnum extends EnumLike>(
  lang: Lang,
  enumType: TEnum,
) =>
  z.nativeEnum(enumType, {
    invalid_type_error: t(lang).validations.invalidField,
    required_error: t(lang).validations.requiredField,
  }) as z.ZodType<TEnum[keyof TEnum], any, unknown>;
