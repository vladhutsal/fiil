import { Router, Status } from './deps.ts';
import { Bson } from './deps.ts';

import { connectToMongo } from './db.ts';
import { IPostDB, IPostF } from "./interfaces.ts";

const mongoClient = await connectToMongo();

export const router = new Router();
const Collection = mongoClient.database().collection<IPostDB>("posts");

function compilePostsF(posts: IPostDB[]): IPostF[] {
  return posts.map((post) => { return { title: post.title }})
}

router
  .get("/api", async (context) => {
    console.log('---> GET ACCESSING')
    try {
      const posts = await Collection
        .find({}, { noCursorTimeout: false })
        .sort({ _id: -1 })
        .map((post) => ({ ...post }));
      
      context.response.status = 200;
      context.response.body = compilePostsF(posts);

    } catch (err) {
      console.error("---> GET ERROR", Date.now().toLocaleString(), err);
      context.response.status = 500;
      throw err;
    }
});

router.post("/api", async (context) => {
  if (!context.request.hasBody) context.throw(Status.BadRequest, "Bad Request");

  const body = await context.request.body().value;
  if (!body) context.throw(Status.BadRequest, "Bad Request");

  const title = body.title;
  if (!title) context.throw(Status.BadRequest, "Title is required");

  const post = {
    _id: new Bson.ObjectId(),
    title,
  };

  await Collection.insertOne(post);

  context.response.body = post;
});