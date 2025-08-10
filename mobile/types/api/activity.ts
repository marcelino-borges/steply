export interface ChallengeActivity {
  title: string;
  description: string | null;
  startAt: Date;
  endAt: Date;
  challengeId: number;
}

export interface NonExistingActivityDto {
  title: string;
  startAt: Date;
  endAt: Date;
  description: string | null;
}

export interface ActivityDto extends ChallengeActivity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
