import {
  ArgumentsHost,
  ForbiddenException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

import { BaseErrorFilter } from "./base-error.filter";
import { CatchAllErrorsFilter } from "./catch-all-errors.filter";

describe("Core infra filters", () => {
  describe("CatchAllErrorsFilter", () => {
    let filter: CatchAllErrorsFilter;
    let baseCatchSpy: jest.SpyInstance;
    const lang = "en";

    beforeEach(() => {
      filter = new CatchAllErrorsFilter();
      baseCatchSpy = jest
        .spyOn(BaseErrorFilter.prototype, "catch")
        .mockImplementation(() => {});
    });

    afterEach(() => {
      baseCatchSpy.mockRestore();
    });

    function createMockArgumentsHost(langHeader?: string): ArgumentsHost {
      return {
        switchToHttp: () => ({
          getResponse: () => ({
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          }),
          getRequest: () => ({
            headers: langHeader ? { lang: langHeader } : {},
          }),
        }),
      } as unknown as ArgumentsHost;
    }

    it("should call super.catch", () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const host = {
        switchToHttp: () => ({
          getResponse: () => mockResponse,
          getRequest: () => ({
            headers: { lang },
          }),
        }),
      } as ArgumentsHost;

      const exception = new ForbiddenException("Forbidden");

      filter.catch(exception, host);

      expect(baseCatchSpy).toHaveBeenCalledWith(exception, host);
    });

    it("should send JSON response with status and message", () => {
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const host = {
        switchToHttp: () => ({
          getResponse: () => mockResponse,
          getRequest: () => ({
            headers: { lang },
          }),
        }),
      } as ArgumentsHost;
      const exception = new ForbiddenException("Forbidden");

      filter.catch(exception, host);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.FORBIDDEN);
      expect(mockResponse.json).toHaveBeenCalledWith({
        statusCode: HttpStatus.FORBIDDEN,
        message: "Forbidden",
      });
    });
  });
});
