import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { ChallengeCheckInTypeDto } from "@/modules/challenges/application/dtos/challenge-checkin-type.dto";
import { ChallengeCheckInTypeRepositoryInterface } from "@/modules/challenges/infra/abstractions/challenge-checkin-type-repository.interface";

export const CHALLENGE_CHECKIN_TYPE_REPOSITORY_TOKEN = Symbol(
  "ChallengeCheckInTypeRepository"
);

@Injectable()
export class ChallengeCheckInTypeRepository
  implements ChallengeCheckInTypeRepositoryInterface
{
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<ChallengeCheckInTypeDto[]> {
    return await this.prismaService.challengeCheckInType.findMany({
      orderBy: { code: "asc" },
    });
  }
}