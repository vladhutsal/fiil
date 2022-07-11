import { Status } from "../deps.ts";
import CRUD from "../db/crud.ts";
import { verifyAndGetJwtPayload } from "../services/services.helpers.ts";
import { RouterMiddleware } from "https://deno.land/x/oak@v10.2.0/router.ts";
import { IRouterState } from "../types/interfaces.ts";

export const autorizeUser = (): RouterMiddleware<string> => (
  async ({ response, request, state }, next): Promise<void> => {
    // TODO: pass global state type from the main.ts typing down here?
    const typedState = state as IRouterState;

    const authHeader: string | null = request.headers.get('Authorization');
    if (authHeader && authHeader.includes('Bearer')) {
      const userToken = authHeader.split('Bearer ')[1];
      const userTokenPayload = await verifyAndGetJwtPayload(userToken);
      if (!userTokenPayload) {
        response.status = Status.Forbidden;
        response.body = { error: `auth: broken authentication` };
        return;
      }

      const storedTokenDb = await CRUD.findToken(userToken, userTokenPayload.uid);
      if (!storedTokenDb) {
        response.status = Status.Forbidden;
        response.body = { error: `auth: not authorized` };
        return;
      }
      const user = await CRUD.findUserById(storedTokenDb.userId);
      if (!user) {
        response.status = Status.NotFound;
        response.body = { error: `auth: no user` };
        return;
      }

      // TODO: Filter user model using yup?
      typedState.user = { _id: user._id, userName: user.userName, created: user.created };
    }
    await next();
  }
)
