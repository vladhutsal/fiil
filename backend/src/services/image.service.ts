import CRUD from '../db/crud.ts';
import { IMG_DIR_PATH } from '../config.ts';
import { Bson, decode as b64decode, encode as b64ecnode } from '../deps.ts';
import { IImagePublic, IResponse } from '../types/interfaces.ts';
import { ImageSchema } from '../types/schemas.ts'
class ImageService {
  public static async createImage(imageData: string): Promise<void> {
    let image64 = imageData.replace('data:image/png;base64,', '');
    image64 = image64.replace(' ', '+');

    const decodedImage = b64decode(image64);

    const now = new Date().getTime();
    const name = `${now}.png`;
    const imageURI = `${IMG_DIR_PATH}${name}`;
    await Deno.writeFile(imageURI, decodedImage);

    const image: ImageSchema = {
      _id: new Bson.ObjectId(),
      imgName: name,
    };
    await CRUD.addImage(image);
  }

  public static async getAllImages(): Promise<IResponse<IImagePublic>> {
    const images = await CRUD.getUserImages();
    const preparedImages: string[] = [];

    for (const img of images) {
      const imgUnit8 = await Deno.readFile(`${IMG_DIR_PATH}${img.imgName}`);
      const encoded = b64ecnode(imgUnit8);
      preparedImages.push(encoded);
    }

    const payload = { images: preparedImages, count: preparedImages.length };
    return { payload };
  }
}

export default ImageService;
