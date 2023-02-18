import { PaginatorEnd, PaginatorStart } from "./types/paginatorType";

export const paginator = (query: any): PaginatorStart=> {
  return {
    searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null, //default null
    sortBy: query.sortBy ? query.sortBy : "createdAt",
    sortDirection: query.sortDirection ? query.sortDirection : "desc",
    pageNumber: query.pageNumber ? query.pageNumber : 1,
    pageSize: query.pageSize ? query.pageSize : 10,
  };
};

export const createFilterSort = (sortBy: string, sortDirection: string) => {
  return { [sortBy]: sortDirection === "desc" ? -1 : 1 };
};

export const countTotalAndPages = async (
  collections: any,
  filter: any,
  pageSize: number
): Promise<{ pagesCount: number; totalCount: number }> => {
  const totalCount = await collections.countDocuments(filter);
  const pagesCount = Math.ceil(totalCount / pageSize);
  return { totalCount: totalCount, pagesCount: pagesCount };
};
