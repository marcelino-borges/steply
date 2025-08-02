export abstract class UseCase<TInput extends Array<unknown>, TOutput> {
  abstract execute(...args: TInput): Promise<TOutput>;
}
