import { Router, Status } from '../deps.ts';
import { API_URL } from "../../env/env.ts";
import { IUser } from "../interfaces.ts";

const authRoutes = (router: Router) => {
  router
    .post(API_URL + 'register-user', async (context) => {
      if (!context.request.hasBody) context.throw(Status.BadRequest, "Bad Request");

      const body: IUser = await context.request.body().value
      if (!body) context.throw(Status.BadRequest, "Bad Request");

      context.response.type = "application/json";
      const strBody = JSON.stringify({ name: body.name, password: body.password });
      context.response.body = strBody;
      
  })
};

export default authRoutes;