import { ObjectId } from "mongodb";
import { countTotalAndPages } from "../paginator";
import { PaginatorEnd, PaginatorStart } from "../types/paginatorType";
import { blogsCollections } from "./db";

export const blogsRepository = {
  //GET
  async findBlogs(paginatorStartInfo: PaginatorStart) {
    const filterName: any = paginatorStartInfo.searchNameTerm
      ? {
          name: {
            $regex: "(?i)" + paginatorStartInfo.searchNameTerm + "(?-i)",
          },
        }
      : {};

    const filterSort: any = {};
    filterSort[paginatorStartInfo.sortBy as keyof typeof filterSort] =
      paginatorStartInfo.sortDirection === "desc" ? -1 : 1;

    //function
    const pagesCounter = await countTotalAndPages(
      blogsCollections,
      filterName,
      paginatorStartInfo.pageSize
    );

    const result = await blogsCollections
      .find(filterName)
      .sort(filterSort)
      .skip((paginatorStartInfo.pageNumber - 1) * paginatorStartInfo.pageSize)
      .limit(paginatorStartInfo.pageSize)
      .toArray();

    const paginatorEndInfo: PaginatorEnd = {
      pagesCount: pagesCounter.pagesCount,
      page: paginatorStartInfo.pageNumber,
      pageSize: paginatorStartInfo.pageSize,
      totalCount: pagesCounter.totalCount,
    };
    return { paginatorEndInfo: paginatorEndInfo, result: result };
  },
  async findBlogById(id: string) {
    const result = blogsCollections.findOne({ _id: new ObjectId(id) });
    return result;
  },
  //POST
  async createBlog(createdBlog: any) {
    const result = await blogsCollections.insertOne(createdBlog);
    return await blogsCollections.findOne({ _id: result.insertedId });
  },
  //UPDATE
  async updateBlog(
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ) {
    const result = await blogsCollections.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name: name, description: description, websiteUrl: websiteUrl } }
    );
    return result.matchedCount === 1;
  },

  //DELETE
  async deleteBlog(id: string) {
    const result = await blogsCollections.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  },
};
//P U D
