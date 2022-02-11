import { Bson } from './deps.ts';

export interface IPostDB {
  _id: Bson.ObjectId;
  title: string;
}

export interface IPostF {
  title: string;
}
