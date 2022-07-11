import { Router } from '../deps.ts';

import { API_URL } from '../config.ts';
import ImageController from '../controllers/image.controller.ts';
import { autorizeUser } from '../middleware/auth.middleware.ts';

const imagesRoutes = (router: Router) => {
  router.get(API_URL + '/get-all-png', autorizeUser(), ImageController.getAllImages);
  router.post(API_URL + '/upload-png', autorizeUser(), ImageController.createImage);
};

export default imagesRoutes;
