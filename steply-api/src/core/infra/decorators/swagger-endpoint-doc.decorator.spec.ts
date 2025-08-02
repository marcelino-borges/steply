import { applyDecorators } from "@nestjs/common";
import {
  EndpointDoc,
  EndpointDocDecoratorArgs,
} from "./swagger-endpoint-doc.decorator";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ApiStandardErrors } from "./swagger-errors.decorator";

jest.mock("@nestjs/common", () => ({
  applyDecorators: jest.fn(),
}));

jest.mock("@nestjs/swagger", () => ({
  ApiBody: jest.fn(),
  ApiBodyOptions: jest.fn(),
  ApiOperation: jest.fn(),
  ApiOperationOptions: jest.fn(),
  ApiResponse: jest.fn(),
  ApiResponseOptions: jest.fn(),
}));

jest.mock("./swagger-errors.decorator", () => ({
  ApiStandardErrors: jest.fn(),
}));

describe("Core infra decorators", () => {
  describe("EndpointDoc", () => {
    const bodyArg = {
      description: "Test description",
    };

    it("should call nestjs 'applyDecorators' with the decorators ApiOperation, ApiResponse and ApiStandardErrors if no body is passed", () => {
      const { operation, response, body }: EndpointDocDecoratorArgs = {
        operation: {
          operationId: "testOID",
          tags: ["tag1"],
        },
        response: {
          status: 201,
        },
      };

      const expectedDecorators = [
        ApiOperation(operation),
        ApiResponse(response),
        ApiStandardErrors(),
      ];

      EndpointDoc({ operation, response, body });

      expect(applyDecorators).toHaveBeenCalledWith(...expectedDecorators);
    });

    it("should call nestjs 'applyDecorators' with the decorators ApiOperation, ApiResponse, ApiStandardErrors and ApiBody if a body is passed", () => {
      const { operation, response, body }: EndpointDocDecoratorArgs = {
        operation: {
          operationId: "testOID",
          tags: ["tag1"],
        },
        response: {
          status: 201,
        },
        body: bodyArg,
      };

      const expectedDecorators = [
        ApiOperation(operation),
        ApiResponse(response),
        ApiStandardErrors(),
        ApiBody(bodyArg),
      ];

      EndpointDoc({ operation, response, body });

      expect(applyDecorators).toHaveBeenCalledWith(...expectedDecorators);
    });
  });
});
