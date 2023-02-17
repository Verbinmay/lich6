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
  //UPDATE
  async updateBlog(
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ) {
    const result = await blogsRepository.updateBlog(
      id,
      name,
      description,
      websiteUrl
    );
    return result;
  },

  //DELETE
  async deleteBlog(id: string) {
    const result = await blogsRepository.deleteBlog(id);
    return result;
  },
};
