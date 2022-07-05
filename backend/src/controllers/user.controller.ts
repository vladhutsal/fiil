import { RouterContext, Status } from "../deps.ts";
import { throwError } from "../helpers.ts";
import { IUserAuth } from "../types/interfaces.ts";
import UserService from "../services/user.service.ts";

class UserController {
  public static async registerUser({ response, request }: RouterContext<string>): Promise<void> {
    try {
      response.type = "application/json";
      if (!request.hasBody) {
        response.body = { error: `empty name/pass ${Status.UnprocessableEntity}}` };
        return;
      }

      const body: IUserAuth = await request.body().value;
      const registerUserResponse = await UserService.create(body);
      if (registerUserResponse.error) response.status = Status.Conflict;

      // TODO: allow user to login on registration
      response.body = registerUserResponse;

    } catch (err) {
      throwError(response, err);
    }
  }

  public static async loginUser({ response, request }: RouterContext<string>): Promise<void> {
    try {
      if (!request.hasBody) {
        response.body = { error: `empty name/pass ${Status.UnprocessableEntity}}` };
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
}

export default UserController;
