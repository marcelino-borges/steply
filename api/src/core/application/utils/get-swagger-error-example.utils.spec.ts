import { getSwaggerErrorExample } from "./get-swagger-error-example.utils";

describe("Core application utils", () => {
  describe("getSwaggerErrorExample", () => {
    it("should return an object withe the same props/values of the inputs", () => {
      const statusCode = 500;
      const message = "Example message";

      const result = getSwaggerErrorExample(statusCode, message);

      expect(result).toStrictEqual({ statusCode, message });
    });
  });
});
