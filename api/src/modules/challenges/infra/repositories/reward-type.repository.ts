import { Injectable } from "@nestjs/common";

import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { Lang } from "@/core/application/locales";
import { RewardTypeDto } from "@/modules/challenges/application/dtos/reward-type.dto";
import { RewardTypeRepositoryInterface } from "@/modules/challenges/infra/abstractions/reward-type-repository.interface";

export const REWARD_TYPE_REPOSITORY_TOKEN = Symbol("RewardTypeRepository");

@Injectable()
export class RewardTypeRepository implements RewardTypeRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(lang: Lang): Promise<RewardTypeDto[]> {
    return await this.prismaService.rewardType.findMany({
      where: {
        active: true,
        lang,
      },
      orderBy: [
        { recommended: "desc" },
        { title: "asc" },
      ],
    });
  }
}