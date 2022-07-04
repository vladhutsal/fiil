import { MongoClient, Database as MongoDB, Collection, Bson } from '../deps.ts';
import { ImageSchema, JWTTokenSchema, UserSchema } from '../types/schemas.ts';
import { APP_DB_NAME } from '../config.ts';
import connection from './init.ts';
import { TMongoInsert } from "../types/types.ts";

// TODO: separate crud for each collection?
class Database {
  private client: MongoClient;
  private database: MongoDB;

  constructor(client: MongoClient) {
    this.client = client;
    this.database = this.client.database(APP_DB_NAME);
  }

  private get imageCollection(): Collection<ImageSchema> {
    return this.database.collection<ImageSchema>('images');
  }

  private get userCollection(): Collection<UserSchema> {
    return this.database.collection<UserSchema>('users');
  }

  private get tokenCollection(): Collection<JWTTokenSchema> {
    return this.database.collection<JWTTokenSchema>('tokens');
  }

  public async getUserImages(): Promise<ImageSchema[]> {
    return await this.imageCollection
      .find({}, { noCursorTimeout: false })
      .sort({ _id: -1 })
      .map((image) => ({ ...image }));
  }

  public async addImage(image: ImageSchema): Promise<void> {
    await this.imageCollection.insertOne(image);
  }

  public async addUser(user: UserSchema): TMongoInsert {
    return await this.userCollection.insertOne(user);
  }

  public async getUser(userName: string): Promise<UserSchema | void> {
    const res = await this.userCollection.find({ userName }).toArray();
    return res.length > 0 ? res[0] : undefined;
  }

  public async saveToken(token: JWTTokenSchema): TMongoInsert {
    return await this.tokenCollection.insertOne(token);
  }
}

const CRUD = new Database(connection);
export default CRUD;
