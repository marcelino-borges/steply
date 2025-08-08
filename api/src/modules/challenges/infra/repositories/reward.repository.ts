import { Injectable } from "@nestjs/common";

import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import {
  NonExistingRewardDto,
  RewardDto,
} from "@/modules/challenges/application/dtos/reward.dto";
import { BaseRewardRepository } from "@/modules/challenges/infra/abstractions/reward-repository.interface";

export const REWARD_REPOSITORY_TOKEN = Symbol("RewardRepository");

@Injectable()
export class RewardRepository implements BaseRewardRepository {
  constructor(private readonly db: PrismaService) {}

  async findAll(challengeId: number): Promise<RewardDto[]> {
    const result = await this.db.reward.findMany({
      where: {
        challengeId,
      },
    });

    return result;
  }

  async create(
    reward: NonExistingRewardDto,
    challengeId: number,
  ): Promise<RewardDto> {
    const created = await this.db.reward.create({
      data: { ...reward, challengeId },
    });

    return created;
  }

  async update(reward: RewardDto): Promise<RewardDto> {
    const updated = await this.db.reward.update({
      where: { id: reward.id },
      data: reward,
    });

    return updated;
  }

  async delete(rewardId: number, challengeId: number): Promise<void> {
    await this.db.reward.delete({
      where: { id: rewardId, challengeId },
    });
  }
}
