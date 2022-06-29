import { Bson, genSalt, hash } from "./deps.ts";
import { IUserPngPrivate, IUserPublic } from "./interfaces.ts";
import { decode as b64decode, encode as b64ecnode } from "./deps.ts";
import { IMG_DIR_PATH } from "../env/env.ts";
import CRUD from './db/crud.ts';

// Auth helpers
export const getPasswordHash = async (pass: string): Promise<string> => {
  const salt = await genSalt(8);
  console.log('salt', salt)
  return hash(pass, salt);
};


// Helps endpoints do their job
// TODO: handle errors
export const requestHelpers = {
  createUserRequest: async (userName: string, password: string): Promise<IUserPublic | void> => {
    const existedUser = await CRUD.getUser(userName);
    if (existedUser) return;
    
    const newUserData = {
      _id: new Bson.ObjectId(),
      userName: userName,
      passHash: await getPasswordHash(password),
      created: new Bson.Timestamp(),
    };
    const createdUserId = await CRUD.addUser(newUserData);
    if (!createdUserId) return;

    return { name: newUserData.userName, created: newUserData.created }

    
  },

  addImageRequest: async (imageData: string) => {
    let image64 = imageData.replace("data:image/png;base64,", "");
    image64 = image64.replace(" ", "+");

    const decodedImage = b64decode(image64);

    const now = new Date().getTime();
    const name = `${now}.png`;
    const imageURI = `${IMG_DIR_PATH}${name}`;
    await Deno.writeFile(imageURI, decodedImage);

    const image: IUserPngPrivate = {
      _id: new Bson.ObjectId(),
      imgName: name,
    };
    await CRUD.addImage(image);
  },

  getAllImagesRequest: async (): Promise<string[]> => {
    const images = await CRUD.getUserImages();
    const preparedImages: string[] = [];

    for (const img of images) {
      const imgUnit8 = await Deno.readFile(`${IMG_DIR_PATH}${img.imgName}`);
      const encoded = b64ecnode(imgUnit8);
      preparedImages.push(encoded);
    }

    return preparedImages;
  },
}
