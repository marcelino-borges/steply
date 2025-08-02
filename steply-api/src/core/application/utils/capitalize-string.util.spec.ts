import { capitalize } from "./capitalize-string.util";

describe("Core application utils", () => {
  describe("capitalize", () => {
    const lowCase = "lowCase";

    it("should return the string passed as parameter with the first letter upper case", () => {
      const result = capitalize(lowCase);

      expect(result).toBe(lowCase.charAt(0).toUpperCase() + lowCase.slice(1));
    });
  });
});
