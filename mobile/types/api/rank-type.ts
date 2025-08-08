export interface RankType {
  title: string;
  minInteractions: number;
  rank: number;
  challengeId: number;
  description: string | null;
}

export interface NonExistingRankTypeDto {
  title: string;
  minInteractions: number;
  rank: number;
  description?: string;
}

export interface RankTypeIdParam {
  rankTypeId: number;
  challengeId: number;
}

export interface RankTypeDto extends RankType {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
