import { Module } from "@nestjs/common";

import { DatabaseModule } from "@/core/infra/services/database.module";
import {
  CHALLENGE_REPOSITORY_TOKEN,
  ChallengeRepository,
} from "@/modules/challenges/infra/repositories/challenge.repository";
import { ChallengeController } from "@/modules/challenges/infra/controllers/challenge.controller";
import {
  RANK_TYPE_REPOSITORY_TOKEN,
  RankTypeRepository,
} from "@/modules/challenges/infra/repositories/rank-type.repository";
import {
  REWARD_REPOSITORY_TOKEN,
  RewardRepository,
} from "@/modules/challenges/infra/repositories/reward.repository";
import {
  ACTIVITY_REPOSITORY_TOKEN,
  ActivityRepository,
} from "@/modules/challenges/infra/repositories/activity.repository";
import { ActivityController } from "@/modules/challenges/infra/controllers/activity.controller";
import { RankTypeController } from "@/modules/challenges/infra/controllers/rank-type.controller";
import { RewardController } from "@/modules/challenges/infra/controllers/reward.controller";
import { CreateChallengeUseCase } from "@/modules/challenges/application/use-cases/challenge/create-challenge.use-case";
import { UpdateChallengeUseCase } from "@/modules/challenges/application/use-cases/challenge/update-challenge.use-case";
import { FindChallengeByIdUseCase } from "@/modules/challenges/application/use-cases/challenge/find-challenge-by-id.use-case";
import { QueryChallengesUseCase } from "@/modules/challenges/application/use-cases/challenge/query-challenges.use-case";
import { CreateRankTypeUseCase } from "@/modules/challenges/application/use-cases/rank-type/create-rank-type.use-case";
import { DeleteRankTypeUseCase } from "@/modules/challenges/application/use-cases/rank-type/delete-rank-type.use-case";
import { UpdateRankTypeUseCase } from "@/modules/challenges/application/use-cases/rank-type/update-rank-type.use-case";
import { CreateActivityUseCase } from "@/modules/challenges/application/use-cases/activity/create-activity.use-case";
import { DeleteActivityUseCase } from "@/modules/challenges/application/use-cases/activity/delete-activity.use-case";
import { FindActivityByIdUseCase } from "@/modules/challenges/application/use-cases/activity/find-activity-by-id.use-case";
import { QueryActivitiesUseCase } from "@/modules/challenges/application/use-cases/activity/query-activities.use-case";
import { UpdateActivityUseCase } from "@/modules/challenges/application/use-cases/activity/update-activity.use-case";
import { CreateRewardUseCase } from "@/modules/challenges/application/use-cases/reward/create-reward.use-case";
import { DeleteRewardUseCase } from "@/modules/challenges/application/use-cases/reward/delete-reward.use-case";
import { FindAllRewardsUseCase } from "@/modules/challenges/application/use-cases/reward/find-all-rewards.use-case";
import { UpdateRewardUseCase } from "@/modules/challenges/application/use-cases/reward/update-reward.use-case";
import { UserInteractChallengeUseCase } from "@/modules/challenges/application/use-cases/challenge/user-interact-challenge.use-case";

@Module({
  imports: [DatabaseModule],
  providers: [
    // #region Repositories
    {
      provide: CHALLENGE_REPOSITORY_TOKEN,
      useClass: ChallengeRepository,
    },
    {
      provide: RANK_TYPE_REPOSITORY_TOKEN,
      useClass: RankTypeRepository,
    },
    {
      provide: REWARD_REPOSITORY_TOKEN,
      useClass: RewardRepository,
    },
    {
      provide: ACTIVITY_REPOSITORY_TOKEN,
      useClass: ActivityRepository,
    },
    // #endregion

    // #region Use cases
    CreateChallengeUseCase,
    UpdateChallengeUseCase,
    FindChallengeByIdUseCase,
    QueryChallengesUseCase,
    UserInteractChallengeUseCase,

    CreateRankTypeUseCase,
    DeleteRankTypeUseCase,
    UpdateRankTypeUseCase,

    CreateActivityUseCase,
    DeleteActivityUseCase,
    FindActivityByIdUseCase,
    QueryActivitiesUseCase,
    UpdateActivityUseCase,

    CreateRewardUseCase,
    DeleteRewardUseCase,
    FindAllRewardsUseCase,
    UpdateRewardUseCase,
    // #endregion
  ],
  controllers: [
    ChallengeController,
    ActivityController,
    RankTypeController,
    RewardController,
  ],
})
export class ChallengeModule {}
