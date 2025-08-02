import { UserGoalDto } from "@/modules/user-goals/application/dtos/user-goal.dto";

export interface UserGoalRepositoryInterface {
  findAll(): Promise<UserGoalDto[]>;
}
