import { MongoClient, Database as MongoDB, Collection, ObjectId } from '../deps.ts';
import { IUserPngPrivate, IUserPrivate } from "../interfaces.ts";
import { APP_DB_NAME } from "../../env/env.ts";
import connection from "./init.ts";


class Database {
  private client: MongoClient;
  private database: MongoDB;

  constructor(client: MongoClient) {
    this.client = client;
    this.database = this.client.database(APP_DB_NAME);
  }

  private get imageCollection(): Collection<IUserPngPrivate> {
    return this.database.collection<IUserPngPrivate>("images");
  }

  private get userCollection(): Collection<IUserPrivate> {
    return this.database.collection<IUserPrivate>("users");
  }


  public async getUserImages(): Promise<IUserPngPrivate[]> {
    return await this.imageCollection
      .find({}, { noCursorTimeout: false })
      .sort({ _id: -1 })
      .map((image) => ({ ...image }));
  }

  public async addImage(image: IUserPngPrivate): Promise<void> {
    await this.imageCollection.insertOne(image);
  }

  public async addUser(user: IUserPrivate): Promise<ObjectId | void> {
    return await this.userCollection.insertOne(user);
  }

  public async getUser(userName: string): Promise<IUserPrivate | void> {
    const res = await this.userCollection.find({ userName }).toArray();
    return res.length > 0 ? res[0] : undefined;
  }
}

const CRUD = new Database(connection);
export default CRUD;
