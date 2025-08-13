export interface RankType {
  title: string;
  minCheckIns: number;
  rank: number;
  challengeId: number;
  description: string | null;
}

export interface NonExistingRankTypeDto {
  title: string;
  minCheckIns: number;
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
