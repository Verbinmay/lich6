import request from "supertest";
import { app } from "../../src/index";

// describe("blogs", () => {
//   beforeAll(async () => {
//     await request(app).delete("/testing/all-data");
//   });

//   it("return 200 and empty pagination`s array", async () => {
//     const result = await request(app).get("/blogs").expect(200);

//     expect(result.body).toEqual({
//       pagesCount: expect.any(Number),
//       page: expect.any(Number),
//       pageSize: expect.any(Number),
//       totalCount: expect.any(Number),
//       items: [],
//     });
//   });

//   it("return 201 and created blog", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Mark",
//         description: "string",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     expect(result.body).toEqual({
//       id: expect.any(String),
//       name: "Mark",
//       description: "string",
//       websiteUrl: "https://github.com/",
//       createdAt: expect.any(String),
//       isMembership: false,
//     });
//   });

//   it("return 200 and pagination`s array with one ", async () => {
//     const result = await request(app)
//       .get(
//         "/blogs/?searchNameTerm=mark&sortBy=createdAt&sortDirection=desc&pageNumber=1&pageSize=10"
//       )
//       .expect(200);

//     expect(result.body).toEqual({
//       pagesCount: 1,
//       page: 1,
//       pageSize: 10,
//       totalCount: 1,
//       items: [
//         {
//           id: expect.any(String),
//           name: "Mark",
//           description: "string",
//           websiteUrl: "https://github.com/",
//           createdAt: expect.any(String),
//           isMembership: false,
//         },
//       ],
//     });
//   });

//   it("return 400, name", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "1234567891011112131415",
//         description: "string",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(400);

//     expect(result.body).toEqual({
//       errorsMessages: expect.any(Array),
//     });
//   });

//   it("return 400,description", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "JIM",
//         description:
//           "Эта функция доступна в версиях Frontline, Business Plus, Enterprise, Education Fundamentals, Education Standard, Teaching and Learning Upgrade и Education Plus, G Suite Basic, G Suite Business, Cloud Identity Premium. Сравнение версий Как администратор, вы можете развернуть устройства Android с уже действующими для них правилами организации. Когда пользователь включает устройство, оно проверяет, назначена ли ему корпоративная конфигурация. Если это так, на устройство скачивается приложение Android Device Policy и выполняется автоматическая настройка устройства.",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(400);

//     expect(result.body).toEqual({
//       errorsMessages: expect.any(Array),
//     });
//   });

//   it("return 400, websiteUrl", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "JON",
//         description: "string",
//         websiteUrl: "hreni",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(400);

//     expect(result.body).toEqual({
//       errorsMessages: expect.any(Array),
//     });
//   });

//   it("return 400, websiteUrl length", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "JON",
//         description: "string",
//         websiteUrl:
//           "https://githubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithub.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(400);

//     expect(result.body).toEqual({
//       errorsMessages: expect.any(Array),
//     });
//   });

//   it("return 401, Unauthorized", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "JON",
//         description: "string",
//         websiteUrl: "https://github.com/",
//       })
//       .expect(401);
//   });

//   it("return 200 FINDBYID", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Yarg",
//         description: "HEY GaYS",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     await request(app)
//       .get("/blogs/" + result.body.id)
//       .expect(200, result.body);
//   });

//   it("return 404 FINDBYID", async () => {
//     await request(app).get("/blogs/-1000").expect(404);
//   });

//   it("return 204 UPDATEBLOG", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Serg",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     await request(app)
//       .put("/blogs/" + result.body.id)
//       .send({
//         name: "Serg",
//         description: "OW NO",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(204);

//     const result2 = await request(app).get("/blogs/" + result.body.id);
//     expect(result2.body.description).toBe("OW NO");
//   });

//   it("return 404 UPDATEBLOG", async () => {
//     await request(app)
//       .put("/blogs/-1000")
//       .send({
//         name: "Serg",
//         description: "OW NO",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(404);
//   });

//   it("return 401 UPDATEBLOG", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "KOOT",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     await request(app)
//       .put("/blogs/" + result.body.id)
//       .send({
//         name: "Serg",
//         description: "OW NO",
//         websiteUrl: "https://github.com/",
//       })
//       .expect(401);
//   });

//   it("return 400 UPDATEBLOG name", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "KOOT",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     await request(app)
//       .put("/blogs/" + result.body.id)
//       .send({
//         name: "KOOTKOOTKOOTKOOTKOOTKOOTKOOTKOOTKOOTKOOTKOOTKOOTKOOT",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(400);
//   });

//   it("return 400 UPDATEBLOG description", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "KOOT",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     await request(app)
//       .put("/blogs/" + result.body.id)
//       .send({
//         name: "KOOT",
//         description:
//           "HEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY momsHEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(400);
//   });

//   it("return 400 UPDATEBLOG name", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "KOOT",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     await request(app)
//       .put("/blogs/" + result.body.id)
//       .send({
//         name: "KOOT",
//         description: "HEY moms",
//         websiteUrl:
//           "https://githubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithubgithub.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(400);
//   });

//   it("return 204 DELETEBLOG", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Serg",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     await request(app)
//       .delete("/blogs/" + result.body.id)
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(204);

//     await request(app)
//       .get("/blogs/" + result.body.id)
//       .expect(404);
//   });

//   it("return 401 DELETEBLOG", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Serg",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     await request(app)
//       .delete("/blogs/" + result.body.id)
//       .expect(401);
//   });

//   it("return 404 DELETEBLOG", async () => {
//     await request(app)
//       .delete("/blogs/-100")
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(404);
//   });

//   it(" return 201 POSTPOSRBYBLOGID", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Serg",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result2 = await request(app)
//       .post("/blogs/" + result.body.id + "/posts")
//       .send({
//         title: "HOOKOV POLON ROT",
//         shortDescription: "string",
//         content: "VIDEO VAPE",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     expect(result2.body).toEqual({
//       id: expect.any(String),
//       title: "HOOKOV POLON ROT",
//       shortDescription: "string",
//       content: "VIDEO VAPE",
//       blogId: result.body.id,
//       blogName: "Serg",
//       createdAt: expect.any(String),
//     });
//   });

//   it(" return 401 POSTPOSRBYBLOGID", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Serg",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result2 = await request(app)
//       .post("/blogs/" + result.body.id + "/posts")
//       .send({
//         title: "HOOKOV POLON ROT",
//         shortDescription: "string",
//         content: "VIDEO VAPE",
//       })
//       .expect(401);
//   });

//   it(" return 404 POSTPOSRBYBLOGID", async () => {
//     const result2 = await request(app)
//       .post("/blogs/-1000/posts")
//       .send({
//         title: "HOOKOV POLON ROT",
//         shortDescription: "string",
//         content: "VIDEO VAPE",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(404);
//   });

//   it(" return 400 POSTPOSRBYBLOGID title ", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Serg",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result2 = await request(app)
//       .post("/blogs/" + result.body.id + "/posts")
//       .send({
//         title:
//           "HOOKOV POLON ROTHOOKOV POLON ROTHOOKOV POLON ROTHOOKOV POLON ROTHOOKOV POLON ROT",
//         shortDescription: "string",
//         content: "VIDEO VAPE",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(400);
//   });

//   it(" return 400 POSTPOSRBYBLOGID shortDescription ", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Serg",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result2 = await request(app)
//       .post("/blogs/" + result.body.id + "/posts")
//       .send({
//         title: "HOOKOV POLON ROT",
//         shortDescription:
//           "stringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstring",
//         content: "VIDEO VAPE",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(400);
//   });

//   it(" return 400 POSTPOSRBYBLOGID TITLE ", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Serg",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result2 = await request(app)
//       .post("/blogs/" + result.body.id + "/posts")
//       .send({
//         title: "HOOKOV POLON ROT",
//         shortDescription: "string",
//         content:
//           "VIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPE",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(400);
//   });

//   it(" return 200 and pagination arr", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Mark",
//         description: "string",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result2 = await request(app)
//       .get("/blogs/" + result.body.id + "/posts")
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(200);

//     expect(result2.body).toEqual({
//       pagesCount: expect.any(Number),
//       page: expect.any(Number),
//       pageSize: expect.any(Number),
//       totalCount: expect.any(Number),
//       items: expect.any(Array),
//     });
//   });

//   it(" return 404 and pagination arr", async () => {
//     const result2 = await request(app)
//       .get("/blogs/-1000/posts")
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(404);
//   });
// });

//TODO ADD POST COMMENT AND GET

// describe("post", () => {
//   beforeAll(async () => {
//     await request(app).delete("/testing/all-data");
//   });

//   it(" return 201 CREATEPOST", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Serg",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result2 = await request(app)
//       .post("/posts")
//       .send({
//         title: "HOOKOV POLON ROT",
//         shortDescription: "string",
//         content: "VIDEO VAPE",
//         blogId: result.body.id,
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     expect(result2.body).toEqual({
//       id: expect.any(String),
//       title: "HOOKOV POLON ROT",
//       shortDescription: "string",
//       content: "VIDEO VAPE",
//       blogId: result.body.id,
//       blogName: "Serg",
//       createdAt: expect.any(String),
//     });
//   });

//   it(" return 400 CREATEPOST title", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Serg",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result2 = await request(app)
//       .post("/posts")
//       .send({
//         title:
//           "HOOKOV POLON ROTHOOKOV POLON ROTHOOKOV POLON ROTHOOKOV POLON ROTHOOKOV POLON ROTHOOKOV POLON ROTHOOKOV POLON ROTHOOKOV POLON ROTHOOKOV POLON ROTHOOKOV POLON ROT",
//         shortDescription: "string",
//         content: "VIDEO VAPE",
//         blogId: result.body.id,
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(400);
//   });

//   it(" return 400 CREATEPOST shortDescription", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Serg",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result2 = await request(app)
//       .post("/posts")
//       .send({
//         title: "HOOKOV POLON ROT",
//         shortDescription:
//           "stringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringvstringstringstring",
//         content: "VIDEO VAPE",
//         blogId: result.body.id,
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(400);
//   });
//   it(" return 400 CREATEPOST content", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Serg",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result2 = await request(app)
//       .post("/posts")
//       .send({
//         title: "HOOKOV POLON ROT",
//         shortDescription: "string",
//         content:
//           "VIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPEVAPEVIDEO VAPE",
//         blogId: result.body.id,
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(400);
//   });

//   it(" return 400 CREATEPOST blogId", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Serg",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result2 = await request(app)
//       .post("/posts")
//       .send({
//         title:
//           "HOOKOV POLON ROTHOOKOV POLON ROTHOOKOV POLON ROTHOOKOV POLON ROTHOOKOV POLON ROTHOOKOV POLON ROTHOOKOV POLON ROTHOOKOV POLON ROTHOOKOV POLON ROTHOOKOV POLON ROT",
//         shortDescription: "string",
//         content: "VIDEO VAPE",
//         blogId: "-1000000",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(400);
//   });

//   it(" return 401 CREATEPOST", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Serg",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result2 = await request(app)
//       .post("/posts")
//       .send({
//         title: "HOOKOV POLON ROT",
//         shortDescription: "string",
//         content: "VIDEO VAPE",
//         blogId: result.body.id,
//       })
//       .expect(401);
//   });

//   it(" return 200 GETPOST", async () => {
//     const result = await request(app).get("/posts").expect(200);

//     expect(result.body).toEqual({
//       pagesCount: expect.any(Number),
//       page: expect.any(Number),
//       pageSize: expect.any(Number),
//       totalCount: expect.any(Number),
//       items: expect.any(Array),
//     });
//   });

//   it(" return 200 GETPOSTBYID", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Serg",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result2 = await request(app)
//       .post("/posts")
//       .send({
//         title: "HOOKOV POLON ROT",
//         shortDescription: "string",
//         content: "VIDEO VAPE",
//         blogId: result.body.id,
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result3 = await request(app)
//       .get("/posts/" + result2.body.id)
//       .expect(200);

//     expect(result3.body).toEqual({
//       id: expect.any(String),
//       title: "HOOKOV POLON ROT",
//       shortDescription: "string",
//       content: "VIDEO VAPE",
//       blogId: result.body.id,
//       blogName: "Serg",
//       createdAt: expect.any(String),
//     });
//   });

//   it(" return 404 GETPOSTBYID", async () => {
//     const result3 = await request(app).get("/posts/-1000").expect(404);
//   });

//   it(" return 204 UPDATEPOST", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Serg",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result2 = await request(app)
//       .post("/posts")
//       .send({
//         title: "HOOKOV POLON ROT",
//         shortDescription: "string",
//         content: "VIDEO VAPE",
//         blogId: result.body.id,
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result3 = await request(app)
//       .put("/posts/" + result2.body.id)
//       .send({
//         title: "OHMYMAY",
//         shortDescription: "string",
//         content: "VIDEO VAPE",
//         blogId: result.body.id,
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(204);

//     const result4 = await request(app).get("/posts/" + result2.body.id);

//     expect(result4.body).toEqual({
//       id: expect.any(String),
//       title: "OHMYMAY",
//       shortDescription: "string",
//       content: "VIDEO VAPE",
//       blogId: result.body.id,
//       blogName: "Serg",
//       createdAt: expect.any(String),
//     });
//   });

//   it(" return 400 UPDATEPOST title", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Serg",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result2 = await request(app)
//       .post("/posts")
//       .send({
//         title: "HOOKOV POLON ROT",
//         shortDescription: "string",
//         content: "VIDEO VAPE",
//         blogId: result.body.id,
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result3 = await request(app)
//       .put("/posts/" + result2.body.id)
//       .send({
//         title: "OHMYMAYOHMYMAYOHMYMAYOHMYMAYOHMYMAY",
//         shortDescription: "string",
//         content: "VIDEO VAPE",
//         blogId: result.body.id,
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(400);
//   });

//   it(" return 400 UPDATEPOST shortDescription", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Serg",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result2 = await request(app)
//       .post("/posts")
//       .send({
//         title: "HOOKOV POLON ROT",
//         shortDescription: "string",
//         content: "VIDEO VAPE",
//         blogId: result.body.id,
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result3 = await request(app)
//       .put("/posts/" + result2.body.id)
//       .send({
//         title: "OHMYMAY",
//         shortDescription:
//           "stringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstring",
//         content: "VIDEO VAPE",
//         blogId: result.body.id,
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(400);
//   });

//   it(" return 400 UPDATEPOST content", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Serg",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result2 = await request(app)
//       .post("/posts")
//       .send({
//         title: "HOOKOV POLON ROT",
//         shortDescription: "string",
//         content: "VIDEO VAPE",
//         blogId: result.body.id,
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result3 = await request(app)
//       .put("/posts/" + result2.body.id)
//       .send({
//         title: "OHMYMAY",
//         shortDescription: "string",
//         content:
//           "VIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEVIDEO VAPEff",
//         blogId: result.body.id,
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(400);
//   });

//   it(" return 400 UPDATEPOST blogId", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Serg",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result2 = await request(app)
//       .post("/posts")
//       .send({
//         title: "HOOKOV POLON ROT",
//         shortDescription: "string",
//         content: "VIDEO VAPE",
//         blogId: result.body.id,
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result3 = await request(app)
//       .put("/posts/" + result2.body.id)
//       .send({
//         title: "OHMYMAYOHMYMAYOHMYM",
//         shortDescription: "string",
//         content: "VIDEO VAPE",
//         blogId: 4,
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(400);
//   });

//   it(" return 400 UPDATEPOST blogId", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Serg",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result2 = await request(app)
//       .post("/posts")
//       .send({
//         title: "HOOKOV POLON ROT",
//         shortDescription: "string",
//         content: "VIDEO VAPE",
//         blogId: result.body.id,
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result3 = await request(app)
//       .put("/posts/" + result2.body.id)
//       .send({
//         title: "OHMYMAYOHMYMAYOHM",
//         shortDescription: "string",
//         content: "VIDEO VAPE",
//         blogId: result.body.id,
//       })
//       .expect(401);
//   });

//   it(" return 404 UPDATEPOST", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Serg",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result3 = await request(app)
//       .put("/posts/-1000")
//       .send({
//         title: "OHMYMAYOHMYMAYOHM",
//         shortDescription: "string",
//         content: "VIDEO VAPE",
//         blogId: result.body.id,
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(404);
//   });

//   it("return 204 DELETEPOST ", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Serg",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result2 = await request(app)
//       .post("/posts")
//       .send({
//         title: "HOOKOV POLON ROT",
//         shortDescription: "string",
//         content: "VIDEO VAPE",
//         blogId: result.body.id,
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result3 = await request(app)
//       .delete("/posts/" + result2.body.id)
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(204);

//     const result4 = await request(app)
//       .get("/posts/" + result2.body.id)
//       .expect(404);
//   });

//   it("return 401 DELETEPOST ", async () => {
//     const result = await request(app)
//       .post("/blogs")
//       .send({
//         name: "Serg",
//         description: "HEY moms",
//         websiteUrl: "https://github.com/",
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result2 = await request(app)
//       .post("/posts")
//       .send({
//         title: "HOOKOV POLON ROT",
//         shortDescription: "string",
//         content: "VIDEO VAPE",
//         blogId: result.body.id,
//       })
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(201);

//     const result3 = await request(app)
//       .delete("/posts/" + result2.body.id)
//       .expect(401);
//   });

//   it("return 404 DELETEPOST ", async () => {
//     const result3 = await request(app)
//       .delete("/posts/-1000")
//       .set("Authorization", "Basic YWRtaW46cXdlcnR5")
//       .expect(404);
//   });

// });

describe("Users", () => {
  beforeAll(async () => {
    await request(app).delete("/testing/all-data");
  });

  it("return 201 POSTUSER", async () => {
    const result = await request(app)
      .post("/users")
      .send({
        login: "mark",
        password: "123456",
        email: "markdlnv@gmail.com",
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5")
      .expect(201);

    expect(result.body).toEqual({
      id: expect.any(String),
      login: "mark",
      email: "markdlnv@gmail.com",
      createdAt: expect.any(String),
    });
  });

  it("return 400 POSTUSER login min ", async () => {
    const result = await request(app)
      .post("/users")
      .send({
        login: "ma",
        password: "123456",
        email: "markdlnv@gmail.com",
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5")
      .expect(400);
  });

  it("return 400 POSTUSER login max ", async () => {
    const result = await request(app)
      .post("/users")
      .send({
        login: "markmarkmark",
        password: "123456",
        email: "markdlnv@gmail.com",
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5")
      .expect(400);
  });

  it("return 400 POSTUSER password min ", async () => {
    const result = await request(app)
      .post("/users")
      .send({
        login: "mark",
        password: "12345",
        email: "markdlnv@gmail.com",
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5")
      .expect(400);
  });

  it("return 400 POSTUSER password max ", async () => {
    const result = await request(app)
      .post("/users")
      .send({
        login: "mark",
        password: "123456789123456789123",
        email: "markdlnv@gmail.com",
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5")
      .expect(400);
  });

  it("return 401 POSTUSER ", async () => {
    const result = await request(app)
      .post("/users")
      .send({
        login: "mark",
        password: "123456789",
        email: "markdlnv@gmail.com",
      })
      .expect(401);
  });

  it("return 200 GETUSER", async () => {
    const result = await request(app)
      .get("/users")
      .set("Authorization", "Basic YWRtaW46cXdlcnR5")
      .expect(200);

    expect(result.body).toEqual({
      pagesCount: expect.any(Number),
      page: expect.any(Number),
      pageSize: expect.any(Number),
      totalCount: expect.any(Number),
      items: expect.any(Array),
    });
  });

  it("return 401 GETUSER", async () => {
    const result = await request(app).get("/users").expect(401);
  });

  it("return 204 DELETEUSER", async () => {
    const result = await request(app)
      .post("/users")
      .send({
        login: "mark",
        password: "123456",
        email: "markdlnv@gmail.com",
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5")
      .expect(201);

    const result2 = await request(app)
      .delete("/users/" + result.body.id)
      .set("Authorization", "Basic YWRtaW46cXdlcnR5")
      .expect(204);
  });

  it("return 401 DELETEUSER", async () => {
    const result = await request(app)
      .post("/users")
      .send({
        login: "mark",
        password: "123456",
        email: "markdlnv@gmail.com",
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5")
      .expect(201);

    const result2 = await request(app)
      .delete("/users/" + result.body.id)
      .expect(401);
  });

  it("return 404 DELETEUSER", async () => {
    const result2 = await request(app)
      .delete("/users/-1000")
      .set("Authorization", "Basic YWRtaW46cXdlcnR5")
      .expect(404);
  });
});

describe("auth", () => {
  beforeAll(async () => {
    await request(app).delete("/testing/all-data");
  });
  it("return 200 POSTAUTH", async () => {
    const result = await request(app)
      .post("/users")
      .send({
        login: "markooo",
        password: "123456",
        email: "markdlnv@gmail.com",
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5")
      .expect(201);

    const result2 = await request(app)
      .post("/auth/login")
      .send({
        loginOrEmail: "markdlnv@gmail.com",
        password: "123456",
      })
      .expect(200);

    expect(result2.body).toEqual({
      accessToken: expect.any(String),
    });
  });

  it("return 400 POSTAUTH login", async () => {
    const result2 = await request(app)
      .post("/auth/login")
      .send({
        loginOrEmail: 345544,
        password: "123456",
      })
      .expect(400);
  });

  it("return 400 POSTAUTH password", async () => {
    const result2 = await request(app)
      .post("/auth/login")
      .send({
        loginOrEmail: "markdlnv@gmail.com",
        password: 123456,
      })
      .expect(400);
  });

  it("return 401 POSTAUTH ", async () => {
    const result2 = await request(app)
      .post("/auth/login")
      .send({
        loginOrEmail: "markdlnv@gmail.com",
        password: "123456-10000-1000",
      })
      .expect(401);
  });

  it("return 200 GETAUTH", async () => {
    const result = await request(app)
      .post("/users")
      .send({
        login: "markiz",
        password: "123456u",
        email: "markdlnv@yahoo.com",
      })
      .set("Authorization", "Basic YWRtaW46cXdlcnR5")
      .expect(201);

    const result2 = await request(app)
      .post("/auth/login")
      .send({
        loginOrEmail: "markdlnv@yahoo.com",
        password: "123456u",
      })
      .expect(200);

    const result3 = await request(app)
      .get("/auth/me")
      .set("Authorization", "Bearer " + result2.body.accessToken)
      .expect(200);

    expect(result3.body).toEqual({
      email: "markdlnv@yahoo.com",
      login: "markiz",
      userId: result.body.id,
    });
  });
});
