import { MongoClient, Database, Collection } from '../deps.ts';
import { IUserPngDB } from "../interfaces.ts";
import { APP_DB_NAME } from "../../env/env.ts";
import connection from "./init.ts";

class CRUD {
  private client: MongoClient;
  private database: Database;

  constructor(client: MongoClient) {
    this.client = client;
    this.database = this.client.database(APP_DB_NAME);
  }

  private get imageCollection(): Collection<IUserPngDB> {
    return this.database.collection<IUserPngDB>("images");
  }

  public async getUserImages(): Promise<IUserPngDB[]> {
    return await this.imageCollection
      .find({}, { noCursorTimeout: false })
      .sort({ _id: -1 })
      .map((image) => ({ ...image }));
  }

  public async postImage(image: IUserPngDB): Promise<void> {
    await this.imageCollection.insertOne(image);
  }
}

const crud = new CRUD(connection);
export default crud;
