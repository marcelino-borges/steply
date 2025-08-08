import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from "@/modules/challenges/infra/constants/challenge.constants";

/**
 * Handles any value passed in the parameters, so the returned values are always safe
 * to be used, even though any of the parameters is undefined, NaN or out of the
 * expected min and max limits.
 * @param paginationNumber The page number sent (or not) in the query.
 * @param paginationSize The page size sent (or not) in the query.
 * @returns The pageNumber and pageSize numbers sent in the query, if they're valid.
 * Otherwise returns safe numbers to be passed in the ORM query.
 */
export const getSafePagination = (
  paginationNumber: string | number | undefined,
  paginationSize: string | number | undefined,
) => {
  const pageNumberAsNumber = Number(paginationNumber);
  const pageSizeAsNumber = Number(paginationSize);
  const isPageNumberValid = !isNaN(pageNumberAsNumber);
  const isPageSizeValid = !isNaN(pageSizeAsNumber);

  const safePageNumber =
    paginationNumber !== undefined && isPageNumberValid
      ? Math.max(0, pageNumberAsNumber - 1)
      : DEFAULT_PAGE_NUMBER - 1;

  const safePageSize =
    paginationSize !== undefined && isPageSizeValid
      ? Math.max(1, pageSizeAsNumber)
      : DEFAULT_PAGE_SIZE;

  return {
    pageNumber: safePageNumber,
    pageSize: safePageSize,
  };
};
