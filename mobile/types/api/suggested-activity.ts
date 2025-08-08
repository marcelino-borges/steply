export interface SuggestedActivityDto {
  id: number;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}