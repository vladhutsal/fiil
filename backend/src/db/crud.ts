import { MongoClient, Database as MongoDB, Collection, Bson } from '../deps.ts';
import { ImageSchema, JwtTokenSchema, UserSchema } from '../types/schemas.ts';
import { APP_DB_NAME } from '../config.ts';
import connection from './init.ts';
import { TMongoInsert } from "../types/types.ts";

// TODO: separated crud for each collection?
// Move all collection work to services?
class Database {
  private client: MongoClient;
  private database: MongoDB;

  constructor(client: MongoClient) {
    this.client = client;
    this.database = this.client.database(APP_DB_NAME);
  }


  // -- collections --
  private get imageCollection(): Collection<ImageSchema> {
    return this.database.collection<ImageSchema>('images');
  }

  private get userCollection(): Collection<UserSchema> {
    return this.database.collection<UserSchema>('users');
  }

  private get tokenCollection(): Collection<JwtTokenSchema> {
    return this.database.collection<JwtTokenSchema>('tokens');
  }


  // -- images --
  public async findAllImages(): Promise<ImageSchema[]> {
    return await this.imageCollection
      .find({}, { noCursorTimeout: false })
      .sort({ _id: -1 })
      .map((image) => ({ ...image }));
  }

  public async insertImage(image: ImageSchema): TMongoInsert {
    return await this.imageCollection.insertOne(image);
  }


  // -- users --
  public async insertUser(user: UserSchema): TMongoInsert {
    return await this.userCollection.insertOne(user);
  }

  public async findUserByName(userName: string): Promise<UserSchema | void> {
    return await this.userCollection.findOne({ userName });
  }

  public async findUserById(_id: Bson.ObjectId): Promise<UserSchema | void> {
    return await this.userCollection.findOne({ _id });
  }


  // -- tokens --
  public async insertToken(token: JwtTokenSchema): TMongoInsert {
    return await this.tokenCollection.insertOne(token);
  }

  public async findToken(token: string, uid: string): Promise<JwtTokenSchema | void> {
    const _id = new Bson.ObjectId(uid);
    return await this.tokenCollection.findOne({ token, _id });
  }
}

const CRUD = new Database(connection);
export default CRUD;
