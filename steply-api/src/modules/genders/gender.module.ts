import { Module } from "@nestjs/common";
import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { GenderController } from "@/modules/genders/infra/controllers/gender.controller";
import { FindAllGendersUseCase } from "@/modules/genders/application/use-cases/find-all-genders.use-case";
import {
  GenderRepository,
  GENDER_REPOSITORY_TOKEN,
} from "@/modules/genders/infra/repositories/gender.repository";

@Module({
  controllers: [GenderController],
  providers: [
    PrismaService,
    FindAllGendersUseCase,
    {
      provide: GENDER_REPOSITORY_TOKEN,
      useClass: GenderRepository,
    },
  ],
})
export class GenderModule {}
