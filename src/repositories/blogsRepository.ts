import { ObjectId } from "mongodb";
import { countTotalAndPages } from "../paginator";
import { BlogDBModel, PostDBModel } from "../types/dbType";
import { PaginatorEnd, PaginatorStart } from "../types/paginatorType";
import { blogsCollections, postsCollections } from "./db";

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

    let result: Array<BlogDBModel> = await blogsCollections
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
    const result: BlogDBModel | null = await blogsCollections.findOne({
      id: id,
    });
    return result;
  },
  //POST
  async createBlog(createdBlog: any) {
    const result = await blogsCollections.insertOne(createdBlog);
    const addId = await blogsCollections.updateOne(
      { _id: result.insertedId },
      { $set: { id: result.insertedId.toString() } }
    );
    const resultFind: BlogDBModel | null = await blogsCollections.findOne({
      _id: result.insertedId,
    });
    return resultFind;
  },
  //UPDATE
  async updateBlog(
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ) {
    const result = await blogsCollections.updateOne(
      { id: id },
      { $set: { name: name, description: description, websiteUrl: websiteUrl } }
    );
    return result.matchedCount === 1;
  },

  //DELETE
  async deleteBlog(id: string) {
    const result = await blogsCollections.deleteOne({ id: id });
    return result.deletedCount === 1;
  },

  //POST-POST-BLOGID
  async postPostByBlogId(createdPost: any) {
    const result = await postsCollections.insertOne(createdPost);
    const addId = await postsCollections.updateOne(
      { _id: result.insertedId },
      { $set: { id: result.insertedId.toString() } }
    );
    const resultFind = await postsCollections.findOne({
      _id: result.insertedId,
    });
    return resultFind;
  },

//GET-POST-BLOGID
  async findPostsByBlogId(paginatorStartInfo:PaginatorStart,
    id:string){
      const filter: any = {blogId:id}

    const filterSort: any = {};
    filterSort[paginatorStartInfo.sortBy as keyof typeof filterSort] =
      paginatorStartInfo.sortDirection === "desc" ? -1 : 1;

    //function
    const pagesCounter = await countTotalAndPages(
      postsCollections,
      filter,
      paginatorStartInfo.pageSize
    );

    let result: Array<PostDBModel> = await postsCollections
      .find(filter)
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
      

    }
};


