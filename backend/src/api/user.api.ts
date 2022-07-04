import { Router } from '../deps.ts';
import { API_URL } from '../config.ts';
import UserController from "../controllers/user.controller.ts";

const authRoutes = (router: Router) => {
  router.post(API_URL + 'register', UserController.createUser);
  router.post(API_URL + 'login', UserController.loginUser);
};

export default authRoutes;