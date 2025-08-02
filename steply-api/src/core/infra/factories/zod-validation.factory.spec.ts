import { z, ZodParsedType } from "zod";
import { ZodValidationFactory } from "./zod-validation.factory";
import { BadRequestException } from "@nestjs/common";

describe("Core infra factories", () => {
  describe("ZodValidationFactory", () => {
    const invalidTypeMessage = "Invalid type";
    const requiredFieldMessage = "Invalid type";

    const schema = () =>
      z.object({
        id: z.number({
          invalid_type_error: invalidTypeMessage,
          required_error: requiredFieldMessage,
        }),
        name: z.string({
          invalid_type_error: invalidTypeMessage,
          required_error: requiredFieldMessage,
        }),
      });
    const lang = "en";

    describe("parseOrThrow", () => {
      it("should throw a BadRequest error containing the fields with validation problems (with the messages set in Zod schema) and the name ZodValidationFactory in the description, when the schema.safeParse is not successful", () => {
        const invalidObject = {
          id: "invalid-id",
        };
        const issue1 = {
          message: "message",
          code: "invalid_type" as const,
          path: ["id"] as string[],
          expected: "string" as ZodParsedType,
          received: "number" as ZodParsedType,
        };
        const issue2 = {
          message: "message",
          code: "invalid_literal" as const,
          path: ["name"],
          expected: "string" as any,
          received: "undefined" as ZodParsedType,
        };

        jest.spyOn(schema(), "safeParse").mockReturnValue({
          success: false,
          error: {
            errors: [issue1, issue2],
            issues: [issue1, issue2],
            format: function (): z.ZodFormattedError<
              { id: number; name: string },
              string
            > {
              return { _errors: ["Test format"] };
            },
            message: "",
            isEmpty: false,
            addIssue: function (): void {},
            addIssues: function (): void {},
            flatten: function (): z.typeToFlattenedError<
              { id: number; name: string },
              string
            > {
              return {
                formErrors: ["Error"],
                fieldErrors: {
                  id: ["ID error"],
                  name: ["name error"],
                },
              };
            },
            formErrors: {
              formErrors: ["Error"],
              fieldErrors: {
                id: ["ID error"],
                name: ["name error"],
              },
            },
            name: "",
          },
        });

        try {
          ZodValidationFactory.parseOrThrow(schema, invalidObject, lang);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect(error.message).toBe(
            `id: ${invalidTypeMessage}; name: ${requiredFieldMessage}`,
          );
        }
      });

      it("should return a data object with the parsed object passed as parameter when the parameter is valid", () => {
        const validObject = {
          id: 123,
          name: "Proper name",
        };

        const { data } = ZodValidationFactory.parseOrThrow(
          schema,
          validObject,
          lang,
        );

        expect(data).toStrictEqual(validObject);
      });

      it("should return a data object containing only the expected props of the object passed as parameter, when the expected props are valid", () => {
        const validObject = {
          id: 123,
          name: "Proper name",
          notExpected1: 1,
          notExpected2: "2",
        };

        const { data } = ZodValidationFactory.parseOrThrow(
          schema,
          validObject,
          lang,
        );

        expect(data).toStrictEqual({
          id: 123,
          name: "Proper name",
        });
      });
    });
  });
});
