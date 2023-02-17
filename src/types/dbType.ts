import { UserViewModel } from "./userType";



export type UserDBModel = UserViewModel & {
    _id: any;
    password: string;
  };

