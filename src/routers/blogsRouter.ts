import { Request, Response, Router } from "express";
import { paginator } from "../paginator";
import { Paginator, PaginatorBlog } from "../types/paginatorType";

export const blogsRouter = Router({});

blogsRouter.get("/", async (req: Request, res: Response) => {
  const paginatorInformation = paginator(req.query);
  const blogsGet = await blogsRepository.findBlogs(paginatorInformation);

  const viewBlogsGet: PaginatorBlog = {
    pagesCount: blogsGet.pagesCount,
    page: blogsGet.page,
    pageSize: blogsGet.pageSize,
    totalCount: blogsGet.totalCount,
    items: blogsGet.items.map((m) => {
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
  res.send(viewBlogsGet);
});
