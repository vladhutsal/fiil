import { MongoClient } from '../deps.ts';
import { validateAndGetSecrets } from "../helpers.ts";
import { ICurrentCollections, IUserPngDB } from "../interfaces.ts";

const secrets = validateAndGetSecrets();

export default async function initMongo(): Promise<ICurrentCollections> {
  const mongoClient = await connectToMongo();
  return getCollections(mongoClient);
}


function getCollections(client: MongoClient): ICurrentCollections {
  const images = client.database().collection<IUserPngDB>("images");
  return { images };
}


async function connectToMongo(): Promise<MongoClient> {
  const client = new MongoClient();
  try {
    console.log('Connecting to DB..')
    await client.connect({
      db: secrets.MONGO_DB,
      tls: true,
      servers: [
        {
          host: secrets.MONGO_CLUSTER,
          port: 27017,
        },
      ],
      credential: {
        username: secrets.MONGO_NAME,
        password: secrets.MONGO_PASS,
        db: "fill",
        mechanism: "SCRAM-SHA-1",
      },
    });
    console.log('Connected to MongoDB')
    return client;
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    throw err;
  }
}
