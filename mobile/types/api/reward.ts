export interface Reward {
  name: string;
  description: string | null;
  rewardTypeId: number;
  deliveryDetails: string | null;
  challengeId: number;
}

export interface NonExistingRewardDto {
  name: string;
  description?: string;
  rewardTypeId: number;
  deliveryDetails?: string;
}

export interface RewardDto extends Reward {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
