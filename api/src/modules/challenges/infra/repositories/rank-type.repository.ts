import { Injectable } from "@nestjs/common";

import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import {
  NonExistingRankTypeDto,
  RankTypeDto,
} from "@/modules/challenges/application/dtos/rank-type.dto";
import { BaseRankTypeRepository } from "@/modules/challenges/infra/abstractions/rank-type-repository.interface";

export const RANK_TYPE_REPOSITORY_TOKEN = Symbol("RankTypeRepository");

@Injectable()
export class RankTypeRepository implements BaseRankTypeRepository {
  constructor(private readonly db: PrismaService) {}

  async create(
    rankType: NonExistingRankTypeDto,
    challengeId: number,
  ): Promise<RankTypeDto> {
    const created = await this.db.rankType.create({
      data: { ...rankType, challengeId },
    });

    return created;
  }

  async update(
    rankType: RankTypeDto,
    challengeId: number,
  ): Promise<RankTypeDto> {
    const updated = await this.db.rankType.update({
      where: { id: rankType.id, challengeId },
      data: rankType,
    });

    return updated;
  }

  async delete(rankTypeId: number, challengeId: number): Promise<void> {
    await this.db.rankType.delete({
      where: { id: rankTypeId, challengeId },
    });
  }
}
