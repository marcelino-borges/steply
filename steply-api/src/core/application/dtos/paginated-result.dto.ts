export class PaginatedItems<T> {
  public readonly hasNextPage: boolean;
  public readonly items: T[];
  public readonly total: number;
  public readonly pageNumber: number;
  public readonly pageSize: number;

  constructor(
    currentPageItems: T[],
    totalCount: number,
    pageNumberParam: number,
    pageSizeParam: number,
  ) {
    this.hasNextPage =
      totalCount > currentPageItems.length + pageSizeParam * pageNumberParam;
    this.items = currentPageItems;
    this.total = totalCount;
    this.pageNumber = pageNumberParam + 1;
    this.pageSize = pageSizeParam;
  }
}
