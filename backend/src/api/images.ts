import { Router } from "../deps.ts";
import { Status } from "../deps.ts";


import { API_URL } from "../../env/env.ts";
import { requestHelpers } from "../helpers.ts";

const imagesRoutes = (router: Router) => {
  router
    .get(API_URL + "get-all-png", async (context) => {
      try {
        const preparedImages = await requestHelpers.getAllImagesRequest();
        context.response.status = 200;
        context.response.body = JSON.stringify({ payload: preparedImages });

      } catch (err) {
        console.error("---> GOT ERROR", err);
        context.response.status = 500;
        throw err;
      }
    }
  ),

  router
    .post(API_URL + "upload-png", async (context) => {
      if (!context.request.hasBody) context.throw(Status.BadRequest, "Bad Request");

      const body = await context.request.body().value;
      if (!body) context.throw(Status.BadRequest, "Bad Request");

      await requestHelpers.addImageRequest(body);

      context.response.status = 201;
    }
  )
};

export default imagesRoutes;
