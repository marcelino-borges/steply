import { z } from "zod";

import { Lang, t } from "../locales";
import { stringSchema } from "./primitives/string.schema";
import { intSchema } from "./primitives/number.schema";
import { dbIdSchema } from "./db-exclusive-fields.schema";

export const createOrganizationSchema = (lang: Lang) =>
  z.object({
    name: stringSchema(lang),
    cnpj: stringSchema(lang),
    street: stringSchema(lang),
    city: stringSchema(lang),
    state: stringSchema(lang),
    addressNumber: stringSchema(lang),
    neighborhood: stringSchema(lang),
    postalCode: stringSchema(lang),
    countryId: intSchema(lang),
    ownerId: intSchema(lang),
  });

export const updateOrganizationSchema = (lang: Lang) =>
  createOrganizationSchema(lang).merge(dbIdSchema(lang));

export const findOrganizationByIdSchema = (lang: Lang) =>
  z.object({
    organizationId: z.coerce
      .number({
        invalid_type_error: t(lang).validations.invalidField,
        required_error: t(lang).validations.requiredField,
      })
      .int(t(lang).validations.invalidField),
  });
