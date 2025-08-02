import { Injectable } from "@nestjs/common";

import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { OrganizationDto } from "@/modules/organizations/application/dtos/organization.dto";
import { Repository } from "@/core/domain/abstractions/repository.interface";
import { DatabaseRecord } from "@/core/domain/abstractions/database-record.interface";
import { ExpandableCountry } from "@/core/domain/abstractions/expandable-country.interface";

export const ORGANIZATION_REPOSITORY_TOKEN = Symbol("OrganizationRepository");

@Injectable()
export class OrganizationRepository implements Repository<OrganizationDto> {
  constructor(private readonly db: PrismaService) {}

  async create(
    organization: Omit<
      OrganizationDto,
      keyof DatabaseRecord | keyof ExpandableCountry
    >,
  ): Promise<OrganizationDto> {
    return await this.db.organization.create({
      data: organization,
      include: { country: true },
    });
  }

  async update(
    organization: Omit<OrganizationDto, "country">,
  ): Promise<OrganizationDto> {
    return await this.db.organization.update({
      where: { id: organization.id },
      data: organization,
      include: { country: true },
    });
  }

  async findById(organizationId: number): Promise<OrganizationDto | null> {
    return await this.db.organization.findUnique({
      where: { id: organizationId },
      include: { country: true },
    });
  }
}
