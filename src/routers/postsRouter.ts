import { Request, Response, Router } from "express";
import { serialize } from "v8";
import { basicValidationMiddleware } from "../middlewares/basicMiddleware";
import {
  contentValidation,
  inputValidationMiddleware,
  isBlogIdValidation,
  shortDescriptionValidation,
  titleValidation,
} from "../middlewares/inputValidationMiddleware";
import { paginator } from "../paginator";
import { postsRepository } from "../repositories/postsRepository";
import { postsService } from "../services/postsService";
import { PostDBModel } from "../types/dbType";
import { PaginatorEnd, PaginatorPost } from "../types/paginatorType";
import { PostViewModel } from "../types/postsType";
import { blogsRouter } from "./blogsRouter";

export const postsRouter = Router({});

//GET
postsRouter.get("/", async (req: Request, res: Response) => {
  const paginatorInformation = paginator(req.query);

  const postsGet: {
    paginatorEndInfo: PaginatorEnd;
    result: Array<PostDBModel>;
  } = await postsRepository.findPosts(paginatorInformation);

  const viewPostsGet: PaginatorPost = {
    pagesCount: postsGet.paginatorEndInfo.pagesCount,
    page: postsGet.paginatorEndInfo.page,
    pageSize: postsGet.paginatorEndInfo.pageSize,
    totalCount: postsGet.paginatorEndInfo.totalCount,
    items: postsGet.result.map((m) => {
      return {
        id: m.id,
        title: m.title,
        shortDescription: m.shortDescription,
        content: m.content,
        blogId: m.blogId,
        blogName: m.blogName,
        createdAt: m.createdAt,
      };
    }),
  };
  res.status(200).send(viewPostsGet);
});

postsRouter.get("/:id", async (req: Request, res: Response) => {
  const postGetById: PostDBModel | null = await postsRepository.findPostById(
    req.params.id
  );

  if (postGetById) {
    const viewPostGetById: PostViewModel = {
      id: postGetById.id,
      title: postGetById.title,
      shortDescription: postGetById.shortDescription,
      content: postGetById.content,
      blogId: postGetById.blogId,
      blogName: postGetById.blogName,
      createdAt: postGetById.createdAt,
    };
    res.status(200).send(viewPostGetById);
  } else {
    res.send(404);
  }
});

//POST
postsRouter.post(
  "/",
  basicValidationMiddleware,
  titleValidation,
  shortDescriptionValidation,
  contentValidation,
  isBlogIdValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const postPost = await postsService.createPost(
      req.body.title,
      req.body.shortDescription,
      req.body.content,
      req.blog
    );

    const viewPostPost = {
      id: postPost!.id,
      title: postPost!.title,
      shortDescription: postPost!.shortDescription,
      content: postPost!.content,
      blogId: postPost!.blogId,
      blogName: postPost!.blogName,
      createdAt: postPost!.createdAt,
    };
    res.status(201).send(viewPostPost);
  }
);

//PUT

postsRouter.put(
  "/:id",
  basicValidationMiddleware,
  titleValidation,
  shortDescriptionValidation,
  contentValidation,
  isBlogIdValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const postGetById: PostDBModel | null = await postsRepository.findPostById(
      req.params.id
    );

    if (postGetById) {
      const postUpdate: boolean = await postsService.updatePost(
        postGetById.id,
        req.body.title,
        req.body.shortDescription,
        req.body.content,
        req.body.blogId
      );
      if (postUpdate) {
        res.send(204);
        return;
      }
    } else {
      res.send(404);
    }
  }
);

//DELETE
postsRouter.delete("/:id", async (req: Request, res: Response) => {
  const postGetById: PostDBModel | null = await postsRepository.findPostById(
    req.params.id
  );

  if (postGetById) {
    const postDelete:boolean = await postsService.deletePost(req.params.id);

    if (postDelete) {
      res.send(204);
      return;
    }
  } else {
    res.send(404);
  }
});
