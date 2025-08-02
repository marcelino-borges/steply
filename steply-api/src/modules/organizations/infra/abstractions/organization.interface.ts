import { Repository } from "@/core/domain/abstractions/repository.interface";
import { OrganizationDto } from "@/modules/organizations/application/dtos/organization.dto";

export interface BaseOrganizationRepository
  extends Repository<OrganizationDto> {}
