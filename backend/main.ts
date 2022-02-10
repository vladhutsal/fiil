import { Application, Router, Status } from "./deps.ts";
import { allowCors } from './deps.ts';

import { Bson } from './deps.ts';
import { timeAgo } from './deps.ts';

// import view from "./view.ts";
import { connectToMongo } from './db.ts';

const app = new Application();
const router = new Router();

const client = await connectToMongo();

interface Post {
  _id: Bson.ObjectId;
  title: string;
}

interface PostDB extends Post {
  timeAgo: string;
}

interface PostF {
  title: string,
  datetime: string,
}

function compilePostsF(posts: PostDB[]): PostF[] {
  return posts.map((post) => { return { title: post.title, datetime: post.timeAgo}})
}

const collection = client.database().collection<Post>("posts");

router
  .get("/", async (context) => {
    console.log('---> GET ACCESSING')
    try {
      const posts = await collection
        .find({}, { noCursorTimeout: false })
        .sort({
          _id: -1,
        })
        .map((post) => ({
          ...post,
          timeAgo: timeAgo(post._id.getTimestamp()),
        }));
      
      context.response.status = 200;
      context.response.body = compilePostsF(posts);
    } catch (err) {
      console.error("---> GET ERROR", Date.now().toLocaleString(), err);
      context.response.status = 500;
      throw err;
    }
});

router.post("/", async (context) => {
  if (!context.request.hasBody) context.throw(Status.BadRequest, "Bad Request");

  const body = await context.request.body().value;
  if (!body) context.throw(Status.BadRequest, "Bad Request");

  const title = body.title;
  if (!title) context.throw(Status.BadRequest, "Title is required");

  const post = {
    _id: new Bson.ObjectId(),
    title,
  };

  await collection.insertOne(post);

  context.response.body = post;
});

app.use(
  allowCors({
    origin: 'http://localhost:8080',
  }),
);
app.use(router.routes());
app.use(router.allowedMethods());

console.info("CORS-enabled web server listening on http://localhost:8000");
app.listen({ port: 8000 });

