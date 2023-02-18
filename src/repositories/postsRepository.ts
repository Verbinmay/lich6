import { countTotalAndPages, createFilterSort } from "../paginator";
import { BlogDBModel, PostDBModel } from "../types/dbType";
import { PaginatorEnd, PaginatorStart } from "../types/paginatorType";
import { postsCollections } from "./db";

export const postsRepository = {
  //GET
  async findPosts(paginatorStartInfo: PaginatorStart) {
    const filter: any = {};
    const filterSort: any = createFilterSort(
      paginatorStartInfo.sortBy,
      paginatorStartInfo.sortDirection
    );
    const pagesCounter: { pagesCount: number; totalCount: number } =
      await countTotalAndPages(
        postsCollections,
        filter,
        paginatorStartInfo.pageSize
      );

    const result: Array<PostDBModel> = await postsCollections
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
  },

  //GETBYID
  async findPostById(id:string){
    const result:PostDBModel|null = await postsCollections.findOne({id:id})
    return result
  },
  

  //POST 
  async crearePost(createdPost:any) {
    const result = await postsCollections.insertOne(createdPost)
    const addId = await postsCollections.findOneAndUpdate({_id:result.insertedId},{$set:{id:result.insertedId.toString()}},{returnDocument: "after"})
    return addId.value
  },

  //PUT

  async updatePost(  id:string, title: string,
    shortDescription: string,
    content: string,
    blogId: string){
        const result = await postsCollections.updateOne({id:id},{$set:{title:title, shortDescription:shortDescription,content:content,blogId:blogId}})
        return result.matchedCount === 1
    },

    //DELETE
    async deletePost(id:string){
        const result = postsCollections.deleteOne({id:id})
        return (await result).deletedCount ===1
    }
};
