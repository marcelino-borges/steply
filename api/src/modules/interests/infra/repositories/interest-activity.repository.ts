import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { InterestActivityRepositoryInterface } from "@/modules/interests/infra/abstractions/interest-activity-repository.interface";
import { InterestActivityDto } from "@/modules/interests/application/dtos/interest-activity.dto";

export const INTEREST_ACTIVITY_REPOSITORY_TOKEN = Symbol("InterestActivityRepository");

@Injectable()
export class InterestActivityRepository implements InterestActivityRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(lang: string): Promise<InterestActivityDto[]> {
    return await this.prismaService.interestActivity.findMany({
      where: {
        lang,
      },
      orderBy: {
        id: "asc",
      },
    });
  }
}