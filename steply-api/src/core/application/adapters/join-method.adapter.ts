import { JoinMethod as ORMEnum } from "prisma/client";
import { JoinMethod as DomainEnum } from "@/core/domain/entities/challenge.entity";

export class JoinMethodAdapter {
  toDomain<ORMEnum>(joinMethod: ORMEnum): DomainEnum;
  toDomain<T>(
    objectWithJoinMethod: T & { joinMethod: ORMEnum },
  ): T & { joinMethod: DomainEnum };

  public toDomain<T>(
    target: ORMEnum | (T & { joinMethod: ORMEnum }),
  ): DomainEnum | (T & { joinMethod: DomainEnum }) {
    const mapEnum = {
      [ORMEnum.OPEN]: DomainEnum.OPEN,
      [ORMEnum.INVITE]: DomainEnum.INVITE,
      [ORMEnum.APPROVAL]: DomainEnum.APPROVAL,
    };

    if (typeof target === "object" && "joinMethod" in target) {
      return {
        ...target,
        joinMethod: mapEnum[target.joinMethod],
      } as T & { joinMethod: DomainEnum };
    }

    return mapEnum[target] ?? DomainEnum.OPEN;
  }

  fromDomain<DomainEnum>(joinMethod: DomainEnum): ORMEnum;
  fromDomain<T>(
    objectWithJoinMethod: T & { joinMethod: DomainEnum },
  ): T & { joinMethod: ORMEnum };

  public fromDomain<T>(
    target: DomainEnum | (T & { joinMethod: DomainEnum }),
  ): ORMEnum | (T & { joinMethod: ORMEnum }) {
    const mapEnum = {
      [DomainEnum.OPEN]: ORMEnum.OPEN,
      [DomainEnum.INVITE]: ORMEnum.INVITE,
      [DomainEnum.APPROVAL]: ORMEnum.APPROVAL,
    };

    if (typeof target === "object" && "joinMethod" in target) {
      return {
        ...target,
        joinMethod: mapEnum[target.joinMethod],
      };
    }

    return mapEnum[target] ?? ORMEnum.OPEN;
  }
}
