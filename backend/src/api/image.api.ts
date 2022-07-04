import { Router } from "../deps.ts";

import { API_URL } from "../../env/env.ts";
import ImageController from "../controllers/images.controller.ts";

const imagesRoutes = (router: Router) => {
  router.get(API_URL + "get-all-png", ImageController.getAllImages);
  router.post(API_URL + "upload-png", ImageController.uploadImage);
};

export default imagesRoutes;
