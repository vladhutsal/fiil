import CRUD from "../db/crud.ts";
import { bcryptCompare, Bson, Status } from "../deps.ts";
import { createUserJwtToken, getPasswordHash } from "./services.helpers.ts";
import { IResponse, IUserPublic, IUserAuth, ITokenPublic, IUserPrivate } from "../types/interfaces.ts";


// TODO:handle errors

// returns jwt token
class UserService {
  public static async register(body: IUserAuth): Promise<IResponse<ITokenPublic>> {
    const existedUser = await CRUD.findUserByName(body.userName);
    if (existedUser) return { error: `username taken ${Status.Conflict}` };
    
    const newUserData = {
      _id: new Bson.ObjectId(),
      userName: body.userName,
      passHash: await getPasswordHash(body.password),
      created: new Date().toUTCString(),
    };
    const createdUserId = await CRUD.insertUser(newUserData);
    if (!createdUserId) return { error: `user not created ${Status.Conflict}` };

    const payload = { token: await createUserJwtToken(createdUserId) };

    return { payload };
  }

  // returns jwt token
  public static async login(body: IUserAuth): Promise<IResponse<ITokenPublic>> {
    const user = await CRUD.findUserByName(body.userName);
    if (!user) return { error: `invalid username ${Status.Forbidden}`};

    const isPassValid = await bcryptCompare(body.password, user.passHash);
    if (!isPassValid) return { error: `invalid password ${Status.Forbidden}`};

    const payload = { token: await createUserJwtToken(user._id) }

    return { payload };
  }

  public static getMe(user: IUserPrivate): IResponse<IUserPublic> {
    const payload  = { userName: user.userName, created: user.created };
    return { payload };
  }
}

export default UserService;
