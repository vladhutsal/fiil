import { Bson, Collection } from './deps.ts';

// Frontend - backend data
export interface IUserPngDB {
  _id: Bson.ObjectId;
  imgName: string;
}


// Internal
export type TImageCollection = Collection<IUserPngDB>;

export interface ICurrentCollections {
  images: TImageCollection;
}

export interface ISecretsDotEnv {
  MONGO_NAME: string;
  MONGO_PASS: string;
  MONGO_DB: string;
  MONGO_CLUSTER: string;
}
