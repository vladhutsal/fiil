import CRUD from "../db/crud.ts";
import { bcryptCompare, Bson, Status } from "../deps.ts";
import { getJWTToken, getPasswordHash } from "../helpers.ts";
import { IResponse, IUserPublic, IUserAuth } from "../types/interfaces.ts";
import { JWTTokenSchema } from "../types/schemas.ts";

class UserService {
  public static async create(body: IUserAuth): Promise<IResponse<IUserPublic>> {
    const existedUser = await CRUD.getUser(body.userName);
    if (existedUser) return { error: `username taken ${Status.Conflict}` };
    
    const newUserData = {
      _id: new Bson.ObjectId(),
      userName: body.userName,
      passHash: await getPasswordHash(body.password),
      created: new Date().toUTCString(),
    };
    const createdUserId = await CRUD.addUser(newUserData);
    if (!createdUserId) return { error: `user not created ${Status.Conflict}` };

    const payload = { userName: newUserData.userName, created: newUserData.created };
    return { payload };
  }

  public static async login(body: IUserAuth): Promise<IResponse<IUserPublic>> {
    const user = await CRUD.getUser(body.userName);
    if (!user) return { error: `invalid username ${Status.Forbidden}`};

    const isPassValid = await bcryptCompare(body.password, user.passHash);
    if (!isPassValid) return { error: `invalid password ${Status.Forbidden}`};

    const token: JWTTokenSchema = {
      _id: new Bson.ObjectId(),
      userId: user._id,
      token: await getJWTToken(user._id),
      created: new Date().toUTCString(),
    }
    await CRUD.saveToken(token);
    
    const payload = {
      token: token.token,
      userName: user.userName,
      created: user.created,
    };

    return { payload };
  }
}

export default UserService;
