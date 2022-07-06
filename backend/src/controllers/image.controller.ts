import { RouterContext, Status } from "../deps.ts";
import { throwError } from "./controllers.helpers.ts";
import ImageService from "../services/image.service.ts";

class ImageController {
  public static async getAllImages({ response }: RouterContext<string>): Promise<void> {
    try {
      const preparedImagesResponse = await ImageService.getAllImages();
      response.body = preparedImagesResponse;
  
    } catch (err) {
      console.log(err);
      throwError(response);
    }
  }

  public static async createImage({ response, request }: RouterContext<string>): Promise<void> {
    try {
      if (!request.hasBody) {
        response.type = "application/json";
        response.body = { error: `no data ${Status.UnprocessableEntity}}` };
        return;
      }
      const body = await request.body().value;
      await ImageService.createImage(body);

      response.status = Status.Created;

    } catch (err) {
      console.log(err);
      throwError(response);
    }
  }
}

export default ImageController;
