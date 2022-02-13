import initMongo from "./init.ts";
import { IUserPngDB } from "../interfaces.ts";

const collections = await initMongo();

export const CRUDGetUserImages = async () => {
  return await collections.images
    .find({}, { noCursorTimeout: false })
    .sort({ _id: -1 })
    .map((image) => ({ ...image }));
}

export const CRUDPostImage = async (image: IUserPngDB) => {
  await collections.images.insertOne(image);
}
