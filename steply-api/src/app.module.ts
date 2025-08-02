import { APP_FILTER } from "@nestjs/core";
import { Module } from "@nestjs/common";

import { DatabaseErrorsFilter } from "@/core/infra/filters/database-errors.filter";
import { CoreModule } from "@/core/core.module";
import { DatabaseModule } from "@/core/infra/services/database.module";
import { UserModule } from "@/modules/users/user.module";
import { OrganizationModule } from "@/modules/organizations/organization.module";
import { ChallengeModule } from "@/modules/challenges/challenge.module";
import { GenderModule } from "@/modules/genders/gender.module";
import { UserGoalModule } from "@/modules/user-goals/user-goal.module";
import { UserMainGoalLevelModule } from "@/modules/user-main-goal-levels/user-main-goal-level.module";

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    OrganizationModule,
    ChallengeModule,
    GenderModule,
    UserGoalModule,
    UserMainGoalLevelModule,
    CoreModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DatabaseErrorsFilter,
    },
  ],
})
export class AppModule {}
