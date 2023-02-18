import { postsRepository } from "../repositories/postsRepository";
import { BlogDBModel } from "../types/dbType";

export const postsService = {
  //POST

  async createPost(
    title: string,
    shortDescription: string,
    content: string,
    blog: BlogDBModel
  ) {
    const createdPost = {
      title: title,
      shortDescription: shortDescription,
      content: content,
      blogId: blog.id,
      blogName: blog.name,
      createdAt: new Date().toISOString(),
    };
    const result = await postsRepository.crearePost(createdPost);
    return result;
  },
  //PUT
  async updatePost(
    id:string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ) {
    const result = postsRepository.updatePost( id, title, shortDescription, content, blogId)
    return result
  },
};
