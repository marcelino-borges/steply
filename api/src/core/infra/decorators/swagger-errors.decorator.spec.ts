import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiStandardErrors } from "./swagger-errors.decorator";
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { getSwaggerErrorExample } from "@/core/application/utils/get-swagger-error-example.utils";
import { t } from "@/core/application/locales";

jest.mock("@nestjs/common", () => ({
  applyDecorators: jest.fn(),
  HttpStatus: {
    BAD_REQUEST: 400,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
  },
}));

jest.mock("@nestjs/swagger", () => ({
  ApiBadRequestResponse: jest.fn(),
  ApiUnprocessableEntityResponse: jest.fn(),
  ApiInternalServerErrorResponse: jest.fn(),
}));

describe("Core infra decorators", () => {
  const dic = t("en");

  describe("ApiStandardErrors", () => {
    it("should call the applyDecorators function with ApiBadRequestResponse, ApiUnprocessableEntityResponse and ApiInternalServerErrorResponse", () => {
      ApiStandardErrors();

      expect(applyDecorators).toHaveBeenCalledWith(
        ApiBadRequestResponse({
          description: "Request contains some invalid or non-existent data",
          example: getSwaggerErrorExample(
            HttpStatus.BAD_REQUEST,
            "Error description",
          ),
        }),
        ApiUnprocessableEntityResponse({
          description:
            "Database has rejected the operation due to an invalid entity passed in the request",
          example: getSwaggerErrorExample(
            HttpStatus.UNPROCESSABLE_ENTITY,
            "Field [fieldName] doesn't exist in [EntityName]",
          ),
        }),
        ApiInternalServerErrorResponse({
          description: dic.internalServerError,
          example: getSwaggerErrorExample(
            HttpStatus.INTERNAL_SERVER_ERROR,
            dic.internalServerError,
          ),
        }),
      );
    });
  });
});
