import { Request, Response, Router } from "express";
import { basicValidationMiddleware } from "../middlewares/basicMiddleware";
import {
  descriptionValidation,
  inputValidationMiddleware,
  nameValidation,
  websiteUrlValidation,
} from "../middlewares/inputValidationMiddleware";
import { paginator } from "../paginator";
import { blogsRepository } from "../repositories/blogsRepository";
import { blogsService } from "../services/blogsService";
import { BlogViewModel } from "../types/blogsType";
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

blogsRouter.get("/:id", async (req: Request, res: Response) => {
  const blogGetByID = await blogsRepository.findBlogById(req.params.id);

  if (blogGetByID) {
    const viewBlogGetById: BlogViewModel = {
      id: blogGetByID._id.toString(),
      name: blogGetByID.name,
      description: blogGetByID.description,
      websiteUrl: blogGetByID.websiteUrl,
      createdAt: blogGetByID.createdAt,
      isMembership: blogGetByID.isMembership,
    };
    res.status(200).send(viewBlogGetById);
  } else {
    res.send(404);
  }
});
//POST

blogsRouter.post(
  "/",
  basicValidationMiddleware,
  nameValidation,
  descriptionValidation,
  websiteUrlValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const blogPost = await blogsService.createBlog(
      req.body.name,
      req.body.description,
      req.body.websiteUrl
    );

    const viewBlogPost: BlogViewModel = {
      id: blogPost!._id.toString(),
      name: blogPost!.name,
      description: blogPost!.description,
      websiteUrl: blogPost!.websiteUrl,
      createdAt: blogPost!.createdAt,
      isMembership: blogPost!.isMembership,
    };
    res.status(201).send(viewBlogPost);
  }
);

//PUT
blogsRouter.put(
  "/:id",
  basicValidationMiddleware,
  nameValidation,
  descriptionValidation,
  websiteUrlValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const blogPut = await blogsService.updateBlog(
      req.params.id,
      req.body.name,
      req.body.description,
      req.body.websiteUrl
    );
    blogPut ? res.send(204) : res.send(404);
  }
);
