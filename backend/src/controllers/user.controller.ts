import { RouterContext, Status } from "../deps.ts";
import { throwError } from "../services/helpers.ts";
import { IUserRegister } from "../interfaces.ts";
import UserService from "../services/user.service.ts";

class UserController {
  public static async create({ response, request }: RouterContext<string>): Promise<void> {
    try {
      response.type = "application/json";
      if (!request.hasBody) {
        response.body = {
          error: `empty name/pass ${Status.UnprocessableEntity}}`,
        };
        return;
      }

      const body: IUserRegister = await request.body().value;
      const createdUserResponse = await UserService.createUser(body);
      response.body = createdUserResponse;
    } catch {
      throwError(response);
    }
  }
}

export default UserController;
