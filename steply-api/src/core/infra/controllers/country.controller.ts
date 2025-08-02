import { Controller, Get } from "@nestjs/common";

import { FindAllCountriesUseCase } from "@/core/application/use-cases/country.use-case";

@Controller("countries")
export class CountryController {
  constructor(private readonly findAllUseCase: FindAllCountriesUseCase) {}

  @Get()
  async findAll() {
    return await this.findAllUseCase.execute();
  }
}
