// swagger-errors.decorator.ts
import { applyDecorators, HttpStatus } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";

import { getSwaggerErrorExample } from "@/core/application/utils/get-swagger-error-example.utils";
import { t } from "@/core/application/locales";

export function ApiStandardErrors() {
  const dic = t("en");

  return applyDecorators(
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
}
