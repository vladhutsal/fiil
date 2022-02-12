import { Bson } from './deps.ts';

export interface IUserPngDB {
  _id: Bson.ObjectId;
  // base64 string
  imgName: string;
}
