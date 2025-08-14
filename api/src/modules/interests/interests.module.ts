import { Module } from "@nestjs/common";
import { PrismaService } from "@/core/infra/services/prisma/prisma.service";
import { InterestActivityController } from "@/modules/interests/infra/controllers/interest-activity.controller";
import { InterestGeneralController } from "@/modules/interests/infra/controllers/interest-general.controller";
import { FindAllInterestActivitiesUseCase } from "@/modules/interests/application/use-cases/find-all-interest-activities.use-case";
import { FindAllInterestGeneralUseCase } from "@/modules/interests/application/use-cases/find-all-interest-general.use-case";
import {
  InterestActivityRepository,
  INTEREST_ACTIVITY_REPOSITORY_TOKEN,
} from "@/modules/interests/infra/repositories/interest-activity.repository";
import {
  InterestGeneralRepository,
  INTEREST_GENERAL_REPOSITORY_TOKEN,
} from "@/modules/interests/infra/repositories/interest-general.repository";

@Module({
  controllers: [InterestActivityController, InterestGeneralController],
  providers: [
    PrismaService,
    FindAllInterestActivitiesUseCase,
    FindAllInterestGeneralUseCase,
    {
      provide: INTEREST_ACTIVITY_REPOSITORY_TOKEN,
      useClass: InterestActivityRepository,
    },
    {
      provide: INTEREST_GENERAL_REPOSITORY_TOKEN,
      useClass: InterestGeneralRepository,
    },
  ],
})
export class InterestsModule {}