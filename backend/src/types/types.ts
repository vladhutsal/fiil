import { Bson, RouterContext } from "../deps.ts";

export type TMongoInsert = Promise<Bson.ObjectId | void>;
export type TRouterContext = RouterContext<string>;