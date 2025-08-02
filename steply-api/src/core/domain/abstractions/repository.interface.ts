import { PaginatedItems } from "@/core/application/dtos/paginated-result.dto";

export interface Repository<TEntity> {
  create?(...args: unknown[]): Promise<TEntity>;
  update?(...args: unknown[]): Promise<TEntity>;
  findById?(...args: unknown[]): Promise<TEntity | null>;
  findAll?(...args: unknown[]): Promise<TEntity[] | PaginatedItems<TEntity>>;
  query?(...args: unknown[]): Promise<TEntity[] | PaginatedItems<TEntity>>;
  delete?(...args: unknown[]): Promise<unknown>;
}
