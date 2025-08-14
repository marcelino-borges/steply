import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { InterestGeneralRepositoryInterface } from "@/modules/interests/infra/abstractions/interest-general-repository.interface";
import { InterestGeneralDto } from "@/modules/interests/application/dtos/interest-general.dto";

export const INTEREST_GENERAL_REPOSITORY_TOKEN = Symbol("InterestGeneralRepository");

@Injectable()
export class InterestGeneralRepository implements InterestGeneralRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(lang: string): Promise<InterestGeneralDto[]> {
    return await this.prismaService.interestGeneral.findMany({
      where: { lang },
      orderBy: { id: "asc" },
    });
  }
}