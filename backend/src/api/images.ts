import { Bson, Router } from "../deps.ts";
import { Status } from "../deps.ts";
import { decode as b64decode, encode as b64ecnode } from "../deps.ts";

import CRUD from "../db/crud.ts";
import { IUserPngDB } from "../interfaces.ts";
import { API_URL, IMG_DIR_PATH } from "../../env/env.ts";

const imagesRoutes = (router: Router) => {
  router
    .get(API_URL + "get-all-png", async (context) => {
      console.log('---- colling image get')
      try {
        const images = await CRUD.getUserImages();

        const imagesToFront: string[] = [];
        for (const img of images) {
          const imgUnit8 = await Deno.readFile(`${IMG_DIR_PATH}${img.imgName}`);
          const encoded = b64ecnode(imgUnit8);
          imagesToFront.push(encoded);
        }
        context.response.status = 200;
        context.response.body = imagesToFront;
      } catch (err) {
        console.error("---> GOT ERROR", err);
        context.response.status = 500;
        throw err;
      }
    }
  ),

  router
    .post(API_URL + "upload-png", async (context) => {
      if (!context.request.hasBody) {
        context.throw(Status.BadRequest, "Bad Request");
      }

      const body = await context.request.body().value;
      if (!body) context.throw(Status.BadRequest, "Bad Request");

      let image64 = body.replace("data:image/png;base64,", "");
      image64 = image64.replace(" ", "+");

      const decodedImage = b64decode(image64);

      const now = new Date().getTime();
      const name = `${now}.png`;
      const imageURI = `${IMG_DIR_PATH}${name}`;
      await Deno.writeFile(imageURI, decodedImage);

      const image: IUserPngDB = {
        _id: new Bson.ObjectId(),
        imgName: name,
      };
      await CRUD.postImage(image);

      context.response.status = 201;
    }
  )
};

export default imagesRoutes;
