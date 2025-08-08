import { Injectable } from "@nestjs/common";

import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { CountryDto } from "@/core/application/dtos/country.dto";
import { BaseCountryRepository } from "@/core/infra/abstractions/country.interface";

export const COUNTRY_REPOSITORY_TOKEN = Symbol("CountryRepository");

@Injectable()
export class CountryRepository implements BaseCountryRepository {
  constructor(private readonly db: PrismaService) {}

  async findAll(): Promise<CountryDto[]> {
    const result = await this.db.country.findMany({
      where: {
        active: true,
      },
      select: {
        id: true,
        abbreviation: true,
        name: true,
        phoneCode: true,
      },
    });

    return result;
  }
}
