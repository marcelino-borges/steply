import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { GenderRepositoryInterface } from "@/modules/genders/infra/abstractions/gender-repository.interface";
import { GenderDto } from "@/modules/genders/application/dtos/gender.dto";

export const GENDER_REPOSITORY_TOKEN = Symbol("GenderRepository");

@Injectable()
export class GenderRepository implements GenderRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<GenderDto[]> {
    return await this.prismaService.gender.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }
}
