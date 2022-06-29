import { Router, Status } from '../deps.ts';
import { API_URL } from "../../env/env.ts";
import { IUserRegister } from "../interfaces.ts";
import { requestHelpers } from "../helpers.ts";

const authRoutes = (router: Router) => {
  router
    .post(API_URL + 'register-user', async (context) => {
      if (!context.request.hasBody) context.throw(Status.BadRequest, "Bad Request");

      const body: IUserRegister = await context.request.body().value
      if (!body) context.throw(Status.BadRequest, "Bad Request");

      const createdUser = await requestHelpers.createUserRequest(body.name, body.password);
      if (!createdUser) {
        context.response.status = Status.BadGateway;
        context.response.body = JSON.stringify({ error: 'username taken' });
        return;
      }

      context.response.type = "application/json";
      const strBody = JSON.stringify(createdUser);
      context.response.body = strBody;
  })
};

export default authRoutes;