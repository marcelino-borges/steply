import type { Config } from "jest";

const ignore = [
  "/node_modules/",
  "/dist/",
  "/build/",
  "/test/helpers/",
  "/__mocks__/",
  "/locales/",
  "/src/main.ts",
  "/.*\\.dto\\.ts$",
  "/.*\\.entity\\.ts$",
  "/.*\\.schema\\.ts$",
  "/.*\\.abstract\\.ts$",
  "/.*\\.module\\.ts$",
  "/constants/",
  "/prisma/",
  "/coverage/",
  "/.postman/",
  "/docker/",
  "/test/",
  "jest.config.ts",
];

const config: Config = {
  preset: "ts-jest",
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^prisma/client$": "<rootDir>/prisma/client",
  },
  testPathIgnorePatterns: ignore,
  coveragePathIgnorePatterns: ignore,
};

export default config;
