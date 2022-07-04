import { RouterContext, Status } from "../deps.ts";
import { throwError } from "../helpers.ts";
import { IUserAuth } from "../types/interfaces.ts";
import UserService from "../services/user.service.ts";

class UserController {
  public static async createUser({ response, request }: RouterContext<string>): Promise<void> {
    try {
      response.type = "application/json";
      if (!request.hasBody) {
        response.body = { error: `empty name/pass ${Status.UnprocessableEntity}}` };
        return;
      }

      const body: IUserAuth = await request.body().value;
      console.log('--- body on registerr', body)
      const createUserResponse = await UserService.create(body);
      if (createUserResponse.error) response.status = Status.Conflict;

      // TODO: allow user to login on registration
      console.log('---- created user response', createUserResponse)
      response.body = createUserResponse;

    } catch {
      throwError(response);
    }
  }

  public static async loginUser({ response, request }: RouterContext<string>): Promise<void> {
    try {
      if (!request.hasBody) {
        response.body = { error: `empty name/pass ${Status.UnprocessableEntity}}` };
        return;
      }

      const body = await request.body().value;
      console.log('--- user for login' , body)
      const loginUserResponse = await UserService.login(body);
      if (loginUserResponse.error) response.status = Status.Forbidden;
      
      response.body = loginUserResponse;

    } catch {
      throwError(response);
    }
  }
}

export default UserController;
