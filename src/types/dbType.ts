import { ObjectId } from "mongodb";
import { UserViewModel } from "./userType";

export type BlogDBModel = {
  _id: ObjectId;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
  isMembership: boolean;
  id: string;
};

export type PostDBModel = {
  _id: ObjectId;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: string;
  id: string;
};

export type UserDBModel = UserViewModel & {
  _id: any;
  password: string;
};
