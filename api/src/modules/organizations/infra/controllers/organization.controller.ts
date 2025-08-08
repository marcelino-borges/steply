import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from "@nestjs/common";

import { ZodValidationFactory } from "@/core/infra/factories/zod-validation.factory";
import { Lang, t } from "@/core/application/locales";
import {
  createOrganizationSchema,
  findOrganizationByIdSchema,
  updateOrganizationSchema,
} from "@/core/application/schemas/organization.schema";
import { CreateOrganizationUseCase } from "@/modules/organizations/application/use-cases/create-organization.use-case";
import { UpdateOrganizationUseCase } from "@/modules/organizations/application/use-cases/update-organization.use-case";
import {
  FindOrganizationByIdParamsDto,
  NonExistingOrganizationDto,
  OrganizationDto,
} from "@/modules/organizations/application/dtos/organization.dto";
import { FindOrganizationByIdUseCase } from "@/modules/organizations/application/use-cases/find-by-id.use-case";

@Controller("organizations")
export class OrganizationController {
  constructor(
    private readonly createOrgUseCase: CreateOrganizationUseCase,
    private readonly updateOrgUseCase: UpdateOrganizationUseCase,
    private readonly findOrgByIdUseCase: FindOrganizationByIdUseCase,
  ) {}

  @Get(":organizationId")
  async findById(
    @Param() params: FindOrganizationByIdParamsDto,
    @Headers("lang") lang: Lang = "en",
  ) {
    const { data } = ZodValidationFactory.parseOrThrow(
      findOrganizationByIdSchema,
      params,
      lang,
    );

    const found = await this.findOrgByIdUseCase.execute(data.organizationId);

    if (!found) {
      throw new BadRequestException(t(lang as Lang).organization.notFound);
    }

    return found;
  }

  @Post()
  async create(
    @Body() newOrganization: NonExistingOrganizationDto,
    @Headers("lang") lang: Lang = "en",
  ) {
    const { data } = ZodValidationFactory.parseOrThrow(
      createOrganizationSchema,
      newOrganization,
      lang,
    );

    return await this.createOrgUseCase.execute(data);
  }

  @Put()
  async update(
    @Body() updatedOrganization: OrganizationDto,
    @Headers("lang") lang: Lang = "en",
  ) {
    const { data } = ZodValidationFactory.parseOrThrow(
      updateOrganizationSchema,
      updatedOrganization,
      lang,
    );

    return await this.updateOrgUseCase.execute(data);
  }
}
