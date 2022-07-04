import { Router } from '../deps.ts';
import authRoutes from "./user.api.ts";
import imagesRoutes from "./image.api.ts";

// TODO: make routes more readable here?
// for better routes readability: https://www.freecodecamp.org/news/create-a-todo-api-in-deno-written-by-a-guy-coming-from-node/

const router = new Router();

authRoutes(router);
imagesRoutes(router);

export default router;