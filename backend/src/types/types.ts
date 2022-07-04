import { Bson } from "../deps.ts";

export type TMongoInsert = Promise<Bson.ObjectId | void>