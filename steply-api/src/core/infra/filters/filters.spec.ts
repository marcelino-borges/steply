import { ArgumentsHost } from "@nestjs/common";

import { BaseErrorFilter } from "./base-error.filter";

describe("Core infra filters", () => {
  describe("BaseErrorFilter", () => {
    let filter: BaseErrorFilter;
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
      filter = new (class extends BaseErrorFilter {})();
      consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    it("should log error with console.error", () => {
      const error = new Error("Test error");
      const host = {} as ArgumentsHost;

      filter.catch(error, host);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `⛔ Error ${error.name} caught: `,
        JSON.stringify(error, null, 2),
      );
    });
  });
});
