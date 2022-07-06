import { Router } from '../deps.ts';
import { API_URL } from '../config.ts';
import UserController from "../controllers/user.controller.ts";

const UAPI_URL = API_URL + '/auth';

const authRoutes = (router: Router) => {
  router.post(UAPI_URL + 'registerUser', UserController.registerUser);
  router.post(UAPI_URL + 'login', UserController.loginUser);
  router.get(UAPI_URL + 'get-me', UserController.getMe);
};

export default authRoutes;