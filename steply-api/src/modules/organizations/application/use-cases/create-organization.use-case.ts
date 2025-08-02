import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import {
  NonExistingOrganizationDto,
  OrganizationDto,
} from "@/modules/organizations/application/dtos/organization.dto";
import { ORGANIZATION_REPOSITORY_TOKEN } from "@/modules/organizations/infra/repository/organization.repository";
import { BaseOrganizationRepository } from "@/modules/organizations/infra/abstractions/organization.interface";

@Injectable()
export class CreateOrganizationUseCase extends UseCase<
  [NonExistingOrganizationDto],
  OrganizationDto
> {
  constructor(
    @Inject(ORGANIZATION_REPOSITORY_TOKEN)
    private readonly repo: BaseOrganizationRepository,
  ) {
    super();
  }

  async execute(
    organization: NonExistingOrganizationDto,
  ): Promise<OrganizationDto> {
    return await this.repo.create!(organization);
  }
}
