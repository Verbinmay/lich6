export const paginator = (query: any) => {
  return {
    searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null, //default null
    sortBy: query.sortBy ? query.sortBy : "createdAt",
    sortDirection: query.sortDirection ? query.sortDirection : "desc",
    pageNumber: query.pageNumber ? query.pageNumber : 1,
    pageSize: query.pageSize ? query.pageSize : 10,
  };
};

export const countTotalAndPages = async (
  collections: any,
  filter: any,
  pageSize: number
) => {
  const totalCount = await collections.countDocuments(filter);
  const pagesCount = Math.ceil(totalCount / pageSize);
  return { totalCount: totalCount, pagesCount: pagesCount };
};
