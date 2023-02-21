import request from "supertest";
import { app } from "../../src/index";
import { client } from "../../src/repositories/db";

describe("/blogs", () => {
  beforeAll(async () => {
    await request(app).delete("/testing/all-data");
  });
 
  it("return 200 and empty pagination`s array", async () => {
    const result = await request(app).get("/blogs").expect(200);

    expect(result.body).toEqual({
      pagesCount: expect.any(Number),
      page: expect.any(Number),
      pageSize: expect.any(Number),
      totalCount: expect.any(Number),
      items: [],
    });
  });
});
