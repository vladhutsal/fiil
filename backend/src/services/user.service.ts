import CRUD from "../db/crud.ts";
import { Bson, Status } from "../deps.ts";
import { getPasswordHash } from "./helpers.ts";
import { IResponse, IUserPublic, IUserRegister } from "../interfaces.ts";

class UserService {
  public static async createUser(body: IUserRegister): Promise<IResponse<IUserPublic>> {
    const existedUser = await CRUD.getUser(body.name);
    if (existedUser) return { error: `username taken ${Status.InternalServerError}` };
    
    const newUserData = {
      _id: new Bson.ObjectId(),
      userName: body.name,
      passHash: await getPasswordHash(body.password),
      created: new Bson.Timestamp(),
    };
    const createdUserId = await CRUD.addUser(newUserData);
    if (!createdUserId) return { error: `user not created ${Status.InternalServerError}` };

    const payload = { name: newUserData.userName, created: newUserData.created };
    return { payload };
  }
}

export default UserService;
