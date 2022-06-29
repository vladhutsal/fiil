import { Bson } from './deps.ts';

// <ISomeName>Private - only for backend
// <ISomeName>Public - shared with frontend

export interface IUserPngPrivate {
  _id: Bson.ObjectId;
  imgName: string;
}


// User:
export interface IUserPrivate {
  _id: Bson.ObjectId;
  userName: string;
  passHash: string;
  created: Bson.Timestamp;
}

export interface IUserRegister {
  name: string;
  password: string;
}

export interface IUserPublic {
  name: string;
  created: Bson.Timestamp;
}
