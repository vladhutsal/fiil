import { Router } from '../deps.ts';
import { API_URL } from "../../env/env.ts";
import UserController from "../controllers/user.controller.ts";

const authRoutes = (router: Router) => {
  router.post(API_URL + 'register-user', UserController.create);
};

export default authRoutes;