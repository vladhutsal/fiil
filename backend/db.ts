import { envConf } from './deps.ts';
import { MongoClient } from './deps.ts';

envConf({ export: true, path: './.env' });

const M_NAME = Deno.env.get("MONGO_NAME");
const M_PASS = Deno.env.get("MONGO_PASS");
const M_DB = Deno.env.get("MONGO_DB_NAME");
const M_CLUSTER = Deno.env.get("MONGO_CLUSTER");

if (!M_NAME || !M_PASS || !M_DB || !M_CLUSTER) throw new Error("Check your Mongo credentials in .env");

export async function connectToMongo(): Promise<MongoClient> {
  const client = new MongoClient();
  try {
    console.log('Connecting to DB..')
    await client.connect({
      db: M_DB!,
      tls: true,
      servers: [
        {
          host: M_CLUSTER!,
          port: 27017,
        },
      ],
      credential: {
        username: M_NAME,
        password: M_PASS,
        db: "fill",
        mechanism: "SCRAM-SHA-1",
      },
    });
    console.log('Connected to DB')
    return client;
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    throw err;
  }
}
