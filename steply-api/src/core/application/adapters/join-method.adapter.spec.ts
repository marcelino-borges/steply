import { JoinMethod as ORMEnum } from "@prisma/client";
import { JoinMethod as DomainEnum } from "@/core/domain/entities/challenge.entity";
import { JoinMethodAdapter } from "./join-method.adapter";

describe("JoinMethodAdapter", () => {
  const adapter = new JoinMethodAdapter();
  describe("Pure ORMEnum toDomain", () => {
    it("should return the domain equivalent enum when the input is the ORM enum", () => {
      const result = adapter.toDomain(ORMEnum.APPROVAL);

      expect(result).toBe(DomainEnum.APPROVAL);
    });

    it("should return the domain equivalent enum OPEN when the input doesn't correspond to any ORM enum", () => {
      const result = adapter.toDomain(41);

      expect(result).toBe(DomainEnum.OPEN);
    });
  });

  describe("Object with prop 'joinMethod' of type ORMEnum toDomain", () => {
    it("should return the domain equivalent enum when the input is the ORM enum", () => {
      type WithJoinMethodProp = {
        prop1: string;
        joinMethod: ORMEnum;
      };
      const withJoinMethod: WithJoinMethodProp = {
        prop1: "1",
        joinMethod: ORMEnum.APPROVAL,
      };
      const result = adapter.toDomain<WithJoinMethodProp>(
        withJoinMethod,
      ) as unknown as WithJoinMethodProp;

      expect(result.joinMethod).toBe(DomainEnum.APPROVAL);
    });
  });

  describe("Pure DomainEnum toORM", () => {
    it("should return the ORM equivalent enum when the input is the domain enum", () => {
      const result = adapter.fromDomain(DomainEnum.APPROVAL);

      expect(result).toBe(ORMEnum.APPROVAL);
    });

    it("should return the ORM equivalent enum OPEN when the input doesn't correspond to any domain enum", () => {
      const result = adapter.fromDomain(41);

      expect(result).toBe(ORMEnum.OPEN);
    });
  });

  describe("Object with prop 'joinMethod' with type of domain enum toORM", () => {
    it("should return the ORM equivalent enum when the input is the domain enum", () => {
      type WithJoinMethodProp = {
        prop1: string;
        joinMethod: DomainEnum;
      };
      const withJoinMethod: WithJoinMethodProp = {
        prop1: "1",
        joinMethod: DomainEnum.APPROVAL,
      };
      const result = adapter.fromDomain<WithJoinMethodProp>(
        withJoinMethod,
      ) as unknown as WithJoinMethodProp;

      expect(result.joinMethod).toBe(ORMEnum.APPROVAL);
    });
  });
});
