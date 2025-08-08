// swagger-errors.decorator.ts
import { applyDecorators } from "@nestjs/common";
import {
  ApiBody,
  ApiBodyOptions,
  ApiOperation,
  ApiOperationOptions,
  ApiResponse,
  ApiResponseOptions,
} from "@nestjs/swagger";

import { ApiStandardErrors } from "./swagger-errors.decorator";

export interface EndpointDocDecoratorArgs {
  operation: ApiOperationOptions;
  response: ApiResponseOptions;
  body?: ApiBodyOptions;
}

export function EndpointDoc({
  operation,
  response,
  body,
}: EndpointDocDecoratorArgs) {
  const decorators = [
    ApiOperation(operation),
    ApiResponse(response),
    ApiStandardErrors(),
  ];

  if (body) {
    decorators.push(ApiBody(body));
  }

  return applyDecorators(...decorators);
}
