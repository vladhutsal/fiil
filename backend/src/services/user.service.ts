import CRUD from "../db/crud.ts";
import { bcryptCompare, Bson, Status } from "../deps.ts";
import { createUserJwtToken, getPasswordHash, getTokenPayload } from "./services.helpers.ts";
import { IResponse, IUserPublic, IUserAuth, IJwtPayload } from "../types/interfaces.ts";


// handle errors
class UserService {
  public static async register(body: IUserAuth): Promise<IResponse<IUserPublic>> {
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

    const payload = { userName: newUserData.userName, created: newUserData.created };
    return { payload };
  }

  public static async login(body: IUserAuth): Promise<IResponse<IUserPublic>> {
    const user = await CRUD.findUserByName(body.userName);
    if (!user) return { error: `invalid username ${Status.Forbidden}`};

    const isPassValid = await bcryptCompare(body.password, user.passHash);
    if (!isPassValid) return { error: `invalid password ${Status.Forbidden}`};

    const token = await createUserJwtToken(user._id);
    const payload = {
      token: token,
      userName: user.userName,
      created: user.created,
    };

    return { payload };
  }

  public static async getMe(userToken: string): Promise<IResponse<IUserPublic>> {
    const userTokenPayload: IJwtPayload = await getTokenPayload(userToken);
    const storedToken = await CRUD.findToken(userToken, userTokenPayload.uid);
    if (!storedToken) return { error: `no token ${Status.NotFound}` };

    const user = await CRUD.findUserById(storedToken._id);
    if (!user) return { error: `no user ${Status.NotFound}` };

    const payload  = { ...user };
    return { payload };
  }
}

export default UserService;
