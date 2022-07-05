import { Bson } from '../deps.ts';

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


export interface IResponse<ResponseDataT> {
  payload?: ResponseDataT;
  error?: string;
}
