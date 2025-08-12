export interface Reward {
  name: string;
  description: string | null;
  rewardTypeId: number;
  deliveryDetails: string | null;
  challengeId: number;
  imageUrl: string | null;
  filesUrls: string[];
}

export interface NonExistingRewardDto {
  name: string;
  description?: string;
  rewardTypeId: number;
  deliveryDetails?: string;
  imageUrl?: string;
  filesUrls?: string[];
}

export interface RewardDto extends Reward {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
