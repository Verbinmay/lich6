import { Request, Response, Router } from "express";
import { usersService } from "../services/usersService";

export const usersRouter = Router({});

//POST
usersRouter.post("/", async (req: Request, res: Response) => {
  const userPost = await usersService.createUser(
    req.body.login,
    req.body.password,
    req.body.email
  );
  const viewUserPost = {
    id: userPost!.id,
    login: userPost!.login,
    email: userPost!.email,
    createdAt: userPost!.createdAt,
  };
  res.status(201).send(viewUserPost);
});
