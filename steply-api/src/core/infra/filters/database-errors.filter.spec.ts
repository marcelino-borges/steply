import { ArgumentsHost } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { DatabaseErrorsFilter } from "./database-errors.filter";
import { BaseErrorFilter } from "./base-error.filter";

describe("Core infra filters", () => {
  describe("DatabaseErrorsFilter", () => {
    let filter: DatabaseErrorsFilter;
    let baseCatchSpy: jest.SpyInstance;
    let prismaErrorGetMessageSpy: jest.SpyInstance;
    const lang = "en";

    beforeEach(() => {
      filter = new DatabaseErrorsFilter();
      baseCatchSpy = jest
        .spyOn(BaseErrorFilter.prototype, "catch")
        .mockImplementation(() => {});
    });

    afterEach(() => {
      baseCatchSpy.mockRestore();
      prismaErrorGetMessageSpy?.mockRestore();
    });

    function createMockArgumentsHost(response: unknown): ArgumentsHost {
      return {
        switchToHttp: () => ({
          getResponse: () => response,
          getRequest: () => ({
            headers: { lang },
          }),
        }),
      } as unknown as ArgumentsHost;
    }

    function createMockPrismaError(
      code: string,
    ): Prisma.PrismaClientKnownRequestError {
      return {
        name: "PrismaClientKnownRequestError",
        message: "Error message",
        code,
        meta: {},
        clientVersion: "4.0.0",
        stack: "",
      } as unknown as Prisma.PrismaClientKnownRequestError;
    }

    it("should call super.catch and send JSON response with status 422 for non-P2025 error", () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const host = createMockArgumentsHost(mockResponse);
      const exception = createMockPrismaError("P2002");

      prismaErrorGetMessageSpy = jest
        .spyOn(
          require("@/core/infra/errors/prisma.error").PrismaError.prototype,
          "getMessage",
        )
        .mockReturnValue("Friendly error message");

      filter.catch(exception, host);

      expect(baseCatchSpy).toHaveBeenCalledWith(exception, host);

      const response = host.switchToHttp().getResponse() as Response;
      expect(response.status).toHaveBeenCalledWith(422);
      expect(response.json).toHaveBeenCalledWith({
        statusCode: 422,
        message: "Friendly error message",
      });
    });

    it("should send status 400 for P2025 error code", () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const host = createMockArgumentsHost(mockResponse);
      const exception = createMockPrismaError("P2025");

      prismaErrorGetMessageSpy = jest
        .spyOn(
          require("@/core/infra/errors/prisma.error").PrismaError.prototype,
          "getMessage",
        )
        .mockReturnValue("Not found error message");

      filter.catch(exception, host);

      const response = host.switchToHttp().getResponse() as Response;
      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({
        statusCode: 400,
        message: "Not found error message",
      });
    });

    it("should default lang to 'pt' if not provided", () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const host = createMockArgumentsHost(mockResponse);
      const exception = createMockPrismaError("P2002");

      prismaErrorGetMessageSpy = jest
        .spyOn(
          require("@/core/infra/errors/prisma.error").PrismaError.prototype,
          "getMessage",
        )
        .mockReturnValue("Friendly error message");

      filter.catch(exception, host);

      const response = host.switchToHttp().getResponse() as Response;
      expect(response.status).toHaveBeenCalledWith(422);
      expect(response.json).toHaveBeenCalledWith({
        statusCode: 422,
        message: "Friendly error message",
      });
    });
  });
});
