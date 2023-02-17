import { ObjectId } from "mongodb";
import { blogsRepository } from "../repositories/blogsRepository";

export const blogsService = {
  //CREATE
  async createBlog(name: string, description: string, websiteUrl: string) {
    const createdBlog = {
      name: name,
      description: description,
      websiteUrl: websiteUrl,
      createdAt: new Date().toISOString(),
      isMembership: false,
    };

    const result = await blogsRepository.createBlog(createdBlog);
    return result;
  },
};
