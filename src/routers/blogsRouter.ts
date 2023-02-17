import { Request, Response, Router } from "express";
import { paginator } from "../paginator";
import { blogsRepository } from "../repositories/blogsRepository";
import { PaginatorEnd, PaginatorBlog } from "../types/paginatorType";

export const blogsRouter = Router({});

//GET

blogsRouter.get("/", async (req: Request, res: Response) => {
  const paginatorInformation = paginator(req.query);
  const blogsGet = await blogsRepository.findBlogs(paginatorInformation);

  const viewBlogsGet: PaginatorBlog = {
    pagesCount: blogsGet.paginatorEndInfo.pagesCount,
    page: blogsGet.paginatorEndInfo.page,
    pageSize: blogsGet.paginatorEndInfo.pageSize,
    totalCount: blogsGet.paginatorEndInfo.totalCount,
    items: blogsGet.result.map((m) => {
      return {
        id: m.id,
        name: m.name,
        description: m.description,
        websiteUrl: m.websiteUrl,
        createdAt: m.createdAt,
        isMembership: m.isMembership,
      };
    }),
  };
  res.status(200).send(viewBlogsGet);
});


