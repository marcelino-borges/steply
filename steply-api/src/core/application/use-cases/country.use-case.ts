import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import { Repository } from "@/core/domain/abstractions/repository.interface";
import { COUNTRY_REPOSITORY_TOKEN } from "@/core/infra/repositories/country.repository";
import { CountryDto } from "@/core/application/dtos/country.dto";

@Injectable()
export class FindAllCountriesUseCase extends UseCase<[], CountryDto[]> {
  constructor(
    @Inject(COUNTRY_REPOSITORY_TOKEN)
    private readonly repo: Repository<CountryDto>,
  ) {
    super();
  }

  async execute(): Promise<CountryDto[]> {
    return (await this.repo.findAll!()) as CountryDto[];
  }
}
