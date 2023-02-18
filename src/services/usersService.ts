import bcrypt from "bcrypt";
import { usersRepository } from "../repositories/usersRepository";
import { UserDBModel } from "../types/dbType";

export const usersService = {
  //POST
  async createUser(login: string, password: string, email: string) {
    const hashBcrypt = await bcrypt.hash(password, 10);

    const createdUser = {
      login: login,
      email: email,
      createdAt: new Date().toISOString(),
      hash: hashBcrypt,
    };
    const result: UserDBModel | null = await usersRepository.createUser(
      createdUser
    );
    return result;
  },
};