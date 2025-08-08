import { UserMainGoalLevelDto } from "@/modules/user-main-goal-levels/application/dtos/user-main-goal-level.dto";

export interface UserMainGoalLevelRepositoryInterface {
  findAll(): Promise<UserMainGoalLevelDto[]>;
}
