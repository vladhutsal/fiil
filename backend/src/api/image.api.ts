import { Router } from "../deps.ts";

import { API_URL } from "../config.ts";
import ImageController from "../controllers/image.controller.ts";

const imagesRoutes = (router: Router) => {
  router.get(API_URL + "get-all-png", ImageController.getAllImages);
  router.post(API_URL + "upload-png", ImageController.createImage);
};

export default imagesRoutes;
