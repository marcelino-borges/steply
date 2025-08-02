import { CountryDto } from "@/core/application/dtos/country.dto";
import { Repository } from "@/core/domain/abstractions/repository.interface";

export interface BaseCountryRepository extends Repository<CountryDto> {}
