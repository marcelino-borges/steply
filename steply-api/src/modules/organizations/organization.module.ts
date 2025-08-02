import { Module } from "@nestjs/common";

import { DatabaseModule } from "@/core/infra/services/database.module";
import { OrganizationController } from "./infra/controllers/organization.controller";
import {
  ORGANIZATION_REPOSITORY_TOKEN,
  OrganizationRepository,
} from "./infra/repository/organization.repository";
import { CreateOrganizationUseCase } from "./application/use-cases/create-organization.use-case";
import { FindOrganizationByIdUseCase } from "./application/use-cases/find-by-id.use-case";
import { UpdateOrganizationUseCase } from "./application/use-cases/update-organization.use-case";

@Module({
  imports: [DatabaseModule],
  controllers: [OrganizationController],
  providers: [
    {
      provide: ORGANIZATION_REPOSITORY_TOKEN,
      useClass: OrganizationRepository,
    },
    CreateOrganizationUseCase,
    FindOrganizationByIdUseCase,
    UpdateOrganizationUseCase,
  ],
})
export class OrganizationModule {}
