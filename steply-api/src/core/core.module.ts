import { Module } from "@nestjs/common";

import { DatabaseModule } from "@/core/infra/services/database.module";
import { CountryController } from "@/core/infra/controllers/country.controller";
import {
  COUNTRY_REPOSITORY_TOKEN,
  CountryRepository,
} from "@/core/infra/repositories/country.repository";
import { FindAllCountriesUseCase } from "@/core/application/use-cases/country.use-case";

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: COUNTRY_REPOSITORY_TOKEN,
      useClass: CountryRepository,
    },
    FindAllCountriesUseCase,
  ],
  controllers: [CountryController],
})
export class CoreModule {}
