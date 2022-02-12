import { Bson } from './deps.ts';
import { envConf } from './deps.ts';
import { Router, Status } from './deps.ts';
import { decode as b64decode, encode as b64ecnode } from './deps.ts';

import { connectToMongo } from './db.ts';
import { IUserPngDB } from "./interfaces.ts";

envConf({ export: true, path: './.env' });

// current set = '/api/'
const apiUrl = Deno.env.get('API_URL') as string;
if (!apiUrl) throw new Error("Check your API_URL value in .env");

const mongoClient = await connectToMongo();

export const router = new Router();
const Collection = mongoClient.database().collection<IUserPngDB>("posts");

// function compileUploadedImages(images: IUserPngDB[]): string[] {
//   return images.map((image) => { return image.imgName });
// }

router
  .get(apiUrl + 'get-all-png', async (context) => {
    try {
      const images = await Collection
        .find({}, { noCursorTimeout: false })
        .sort({ _id: -1 })
        .map((image) => ({ ...image }));

      const imagesToFront = [];
      for (const img of images) {
        const imgUnit8 = await Deno.readFile(`/backend/images/${img.imgName}`);
        const encoded = b64ecnode(imgUnit8);
        imagesToFront.push(encoded);
      }
      context.response.status = 200;
      context.response.body = { data: imagesToFront };

    } catch (err) {
      console.error("---> GET ERROR", err);
      context.response.status = 500;
      throw err;
    }
});


router
  .post(apiUrl + 'upload-png', async (context) => {
    if (!context.request.hasBody) context.throw(Status.BadRequest, "Bad Request");
    const body = await context.request.body().value;

    let image64 = body.replace("data:image/png;base64,", "");
    image64 = image64.replace(" ", "+");

    const decodedImage = b64decode(image64);
  
    const now = new Date().getTime();
    const name = `${now}.png`;
    const URI_Image = `/backend/images/${name}`
    await Deno.writeFile(URI_Image, decodedImage);

    const png = {
      _id: new Bson.ObjectId(),
      imgName: name,
    }

    await Collection.insertOne(png)
    context.response.status = 201;
})

// router
//   .post(apiUrl, async (context) => {
//     if (!context.request.hasBody) context.throw(Status.BadRequest, "Bad Request");

//     const body = await context.request.body().value;
//     if (!body) context.throw(Status.BadRequest, "Bad Request");

//     const title = body.title;
//     if (!title) context.throw(Status.BadRequest, "Title is required");

//     const post = {
//       _id: new Bson.ObjectId(),
//       title,
//     };

//     await Collection.insertOne(post);

//     context.response.body = post;
// });
