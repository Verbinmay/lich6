import { usersCollections } from "./db";

export const usersRepository = {
  //POST
  async createUser(createdUser: any) {
    const result = await usersCollections.insertOne(createdUser);
    const addId = await usersCollections.findOneAndUpdate(
      { _id: result.insertedId },
      {
        $set: {
          id: result.insertedId.toString(),
        },
      },
      { returnDocument: "after" }
    );
    return addId.value;
  },
};
