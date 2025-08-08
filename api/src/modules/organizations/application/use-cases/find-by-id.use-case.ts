import { Inject, Injectable } from "@nestjs/common";

import { UseCase } from "@/core/domain/abstractions/use-case.abstract";
import { OrganizationDto } from "@/modules/organizations/application/dtos/organization.dto";
import { ORGANIZATION_REPOSITORY_TOKEN } from "@/modules/organizations/infra/repository/organization.repository";
import { BaseOrganizationRepository } from "@/modules/organizations/infra/abstractions/organization.interface";

@Injectable()
export class FindOrganizationByIdUseCase extends UseCase<
  [number],
  OrganizationDto | null
> {
  constructor(
    @Inject(ORGANIZATION_REPOSITORY_TOKEN)
    private readonly repo: BaseOrganizationRepository,
  ) {
    super();
  }

  async execute(organizationId: number): Promise<OrganizationDto | null> {
    return await this.repo.findById!(organizationId);
  }
}
