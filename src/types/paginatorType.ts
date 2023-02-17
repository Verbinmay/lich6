import { BlogViewModel } from "./blogsType";
import { CommentViewModel } from "./commentsType";
import { PostViewModel } from "./postsType";
import { UserViewModel } from "./userType";


export type Paginator = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
  };
  
  export type PaginatorBlog = Paginator & {
    items: Array<BlogViewModel>;
  };
  
  export type PaginatorPost = Paginator & {
    items: Array<PostViewModel>;
  };
  
  export type PaginatorUser = Paginator & {
    items: Array<UserViewModel>;
  };

  export type PaginatorCommentViewModel = Paginator & {
    items: Array<CommentViewModel>;
  };