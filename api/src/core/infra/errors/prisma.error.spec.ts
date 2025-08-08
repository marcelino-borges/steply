import { Prisma } from "prisma/client";
import { PrismaError } from "./prisma.error";
import { t } from "@/core/application/locales";

describe("PrismaError", () => {
  const dictionary = t("en");

  function createMockPrismaError(
    code: string,
    message: string,
    meta?: Record<string, any>,
  ): Prisma.PrismaClientKnownRequestError {
    return {
      name: "PrismaClientKnownRequestError",
      message,
      code,
      meta,
      clientVersion: "4.0.0",
      stack: "",
    } as unknown as Prisma.PrismaClientKnownRequestError;
  }

  it("should create an instance and return capitalized friendly message", () => {
    const prismaError = createMockPrismaError(
      "P2002",
      "Unique constraint failed",
      {
        modelName: "User",
        target: "email",
      },
    );
    const error = new PrismaError(prismaError, dictionary);

    const message = error.getMessage();
    expect(message).toBe("User already exists with the same field email.");
  });

  it("should return original Prisma error with getPrismaError()", () => {
    const prismaError = createMockPrismaError(
      "P2002",
      "Unique constraint failed",
    );
    const error = new PrismaError(prismaError, dictionary);

    expect(error.getPrismaError()).toBe(prismaError);
  });

  it("should return unknown error message if code not in dictionary", () => {
    const prismaError = createMockPrismaError("P9999", "Some unknown error");
    const error = new PrismaError(prismaError, dictionary);

    expect(error.getMessage()).toBe("Unknown error in database.");
  });

  it("should replace placeholders correctly when modelName and field_name are missing, but there is a 'target'", () => {
    const prismaError = createMockPrismaError("P2002", "Constraint failed", {
      target: "title",
    });
    const error = new PrismaError(prismaError, dictionary);

    const message = error.getMessage();
    expect(message).toBe("Entity already exists with the same field title.");
  });

  it("should consolidate string and array targets correctly", () => {
    const prismaErrorStringTarget = createMockPrismaError(
      "P2002",
      "Unique constraint failed",
      {
        modelName: "User",
        target: "email",
      },
    );
    const errorStringTarget = new PrismaError(
      prismaErrorStringTarget,
      dictionary,
    );
    expect(errorStringTarget.getMessage()).toContain("email");

    const prismaErrorArrayTarget = createMockPrismaError(
      "P2002",
      "Unique constraint failed",
      {
        modelName: "User",
        target: ["email"],
      },
    );
    const errorArrayTarget = new PrismaError(
      prismaErrorArrayTarget,
      dictionary,
    );
    expect(errorArrayTarget.getMessage()).toBe(
      "User already exists with the same field email.",
    );
  });

  it("should capitalize the first letter of the friendly message", () => {
    const prismaError = createMockPrismaError(
      "P2002",
      "unique constraint failed",
      {
        modelName: "User",
        target: "email",
      },
    );
    const error = new PrismaError(prismaError, dictionary);

    const message = error.getMessage();
    expect(message.charAt(0)).toBe(message.charAt(0).toUpperCase());
  });
});
