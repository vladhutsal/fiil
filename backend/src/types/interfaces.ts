import { Bson, Payload } from '../deps.ts';

// <ISomeName>Public - shared with frontend

export interface IUserPublic {
  token?: string;
  userName: string;
  created: string;
}

export interface IImagePublic {
  images: string[];
  count: number;
}

export interface IUserAuth {
  userName: string;
  password: string;
}


export interface IDbFindUser {
  _id?: Bson.ObjectId;
  userName?: string;
}


export interface IJwtPayload extends Payload {
  uid: string;
}


export interface IResponse<ResponseDataT> {
  payload?: ResponseDataT;
  error?: string;
}
