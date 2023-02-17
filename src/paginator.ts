export const paginator = (query: any) => {
  return {
    searchNameTerm: query.searchNameTerm ? query.searchNameTerm : "", //default null
    sortBy: query.sortBy ? query.sortBy : "createdAt",
    sortDirection: query.sortDirection ? query.sortDirection : "desc",
    pageNumber: query.pageNumber ? query.pageNumber : 1,
    pageSize: query.pageSize ? query.pageSize : 10,
  };
};
