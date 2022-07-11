import { Router } from '../deps.ts';
import { API_URL } from '../config.ts';
import UserController from "../controllers/user.controller.ts";
import { autorizeUser } from "../middleware/auth.middleware.ts";

const authRoutes = (router: Router) => {
  router.post(API_URL + '/auth/register', UserController.registerUser);
  router.post(API_URL + '/auth/login', UserController.loginUser);
  router.get(API_URL + '/user/get-me', autorizeUser(), UserController.getMe);
};

export default authRoutes;
