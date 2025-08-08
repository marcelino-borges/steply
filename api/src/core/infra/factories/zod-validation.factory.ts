import { BadRequestException } from "@nestjs/common";
import { z, ZodSchema } from "zod";

export abstract class ZodValidationFactory {
  public static parseOrThrow<
    TSchema extends ZodSchema<any>,
    Lang extends string = "en",
  >(
    schemaFactory: (lang: Lang) => TSchema,
    data: unknown,
    lang: Lang = "en" as Lang,
  ): { data: z.infer<TSchema> } {
    const schema = schemaFactory(lang);
    const result = schema.safeParse(data);

    if (!result.success) {
      const messages = result.error.errors.map(
        (e) => `${e.path.join(".")}: ${e.message}`.trim(),
      );
      throw new BadRequestException(messages.join("; "), {
        description: "ZodValidationFactory",
      });
    }

    return { data: result.data };
  }
}
