export interface RewardType {
  title: string;
  description: string | null;
  active: boolean;
  recommended: boolean;
  lang: string;
}

export interface RewardTypeDto extends RewardType {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}