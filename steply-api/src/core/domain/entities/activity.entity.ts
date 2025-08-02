import { Challenge } from "./challenge.entity";

export class Activity {
  constructor(
    public readonly title: string,
    public readonly description: string | null,
    public readonly startAt: Date,
    public readonly endAt: Date,
    public readonly challengeId: number,
  ) {}
}
