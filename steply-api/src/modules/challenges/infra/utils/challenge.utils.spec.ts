import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from "../constants/challenge.constants";
import { getSafePagination } from "./challenge.utils";

describe("ChallengeUtils", () => {
  describe("getSafePagination", () => {
    const validNumber = 10;
    const notANumber = "1a";
    const negativeNumber = -3;

    it("should return the default number (0) for pageNumber when it's passed as undefined or negative in parameters", () => {
      const result1 = getSafePagination(undefined, validNumber);
      const result2 = getSafePagination(negativeNumber, validNumber);

      const expectedNumber = DEFAULT_PAGE_NUMBER - 1;

      expect(result1.pageNumber).toBe(expectedNumber);
      expect(result2.pageNumber).toBe(expectedNumber);
    });

    it("should return the default number (0) for pageNumber when it's passed with a type different from number", () => {
      const result1 = getSafePagination(notANumber, validNumber);

      expect(result1.pageNumber).toBe(DEFAULT_PAGE_NUMBER - 1);
    });

    it(`should return the min number (1) for pageSize when it's passed as negative in parameters`, () => {
      const result2 = getSafePagination(validNumber, negativeNumber);

      expect(result2.pageSize).toBe(1);
    });

    it(`should return the default number (${DEFAULT_PAGE_SIZE}) for pageSize when it's passed as undefined in parameters`, () => {
      const result1 = getSafePagination(validNumber, undefined);

      expect(result1.pageSize).toBe(DEFAULT_PAGE_SIZE);
    });

    it(`should return the default number (${DEFAULT_PAGE_SIZE}) for pageSize when it's passed with a type different from number`, () => {
      const result1 = getSafePagination(notANumber, validNumber);

      expect(result1.pageSize).toBe(DEFAULT_PAGE_SIZE);
    });

    it("should return the same pageSize passed in parameter, if it's a valid number", () => {
      const result1 = getSafePagination(validNumber, validNumber);

      expect(result1.pageSize).toBe(validNumber);
    });

    it("should return the [pageNumber passed in parameter] - 1, if it's a valid number", () => {
      const result1 = getSafePagination(validNumber, validNumber);

      expect(result1.pageSize).toBe(validNumber);
    });
  });
});
