export interface Activity {
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
  description?: string;
}

export interface ActivityDto extends Activity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
