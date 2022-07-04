import { Bson } from "../deps.ts";

export interface ImageSchema {
  _id: Bson.ObjectId;
  imgName: string;
}

export interface UserSchema {
  _id: Bson.ObjectId;
  userName: string;
  passHash: string;
  created: Bson.Timestamp;
}

export interface JWTTokenSchema {
  _id: Bson.ObjectId;
  userId: Bson.ObjectId;
  token: string;
  created: Bson.Timestamp;
}
