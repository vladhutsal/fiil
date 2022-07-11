import { Bson, Payload, State } from '../deps.ts';

// <ISomeName>Public - to share with frontend as IResponse.payload property

export interface IUserPublic {
  userName: string;
  created: string;
}

export interface IImagesPublic {
  images: string[];
  count: number;
}

export interface ITokenPublic {
  token: string;
}


export interface IUserAuth {
  userName: string;
  password: string;
}


export interface IJwtPayload extends Payload {
  uid: string;
}

// temp, while yup is not here
export interface IUserPrivate extends IUserPublic {
  _id: Bson.ObjectId;
}


export interface IRouterState extends State {
  user: IUserPrivate
}


export interface IResponse<ResponseDataT> {
  payload?: ResponseDataT;
  error?: string;
}
