import { Status } from "../deps.ts";
import { throwError } from "./controllers.helpers.ts";
import { IRouterState, IUserAuth } from "../types/interfaces.ts";
import UserService from "../services/user.service.ts";
import { TRouterContext } from "../types/types.ts";

class UserController {
  public static async registerUser({ response, request }: TRouterContext): Promise<void> {
    try {
      response.type = "application/json";
      if (!request.hasBody) {
        response.body = { error: `register: empty name/pass ${Status.UnprocessableEntity}}` };
        return;
      }

      const body: IUserAuth = await request.body().value;
      const registerUserResponse = await UserService.register(body);
      if (registerUserResponse.error) response.status = Status.Conflict;

      // TODO: allow user to login on registration
      response.body = registerUserResponse;

    } catch (err) {
      throwError(response, err);
    }
  }

  public static async loginUser({ response, request }: TRouterContext): Promise<void> {
    try {
      if (!request.hasBody) {
        response.body = { error: `login: empty name/pass ${Status.UnprocessableEntity}}` };
        return;
      }

      const body = await request.body().value;
      const loginUserResponse = await UserService.login(body);
      if (loginUserResponse.error) response.status = Status.Forbidden;

      response.body = loginUserResponse;

    } catch (err) {
      throwError(response, err);
    }
  }

  public static getMe({ response, state }: TRouterContext): void {
    try {
      const typedState = state as IRouterState;

      const getMeResponse = UserService.getMe(typedState.user);
      if (getMeResponse.error) response.status = Status.NotFound;
      response.body = getMeResponse;

    } catch (err) {
      console.log(err);
    }
  }
}

export default UserController;
