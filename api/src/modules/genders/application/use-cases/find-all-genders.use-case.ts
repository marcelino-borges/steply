import { Injectable, Inject } from "@nestjs/common";
import { GenderRepositoryInterface } from "@/modules/genders/infra/abstractions/gender-repository.interface";
import { GENDER_REPOSITORY_TOKEN } from "@/modules/genders/infra/repositories/gender.repository";
import { GenderDto } from "@/modules/genders/application/dtos/gender.dto";

@Injectable()
export class FindAllGendersUseCase {
  constructor(
    @Inject(GENDER_REPOSITORY_TOKEN)
    private readonly genderRepository: GenderRepositoryInterface,
  ) {}

  async execute(): Promise<GenderDto[]> {
    return await this.genderRepository.findAll();
  }
}
