import { MONGO_URL } from "../../env/env.ts";
import { MongoClient } from '../deps.ts';

async function connectToMongo(): Promise<MongoClient> {
  try {
    console.log('Connecting to DB..')

    const client = new MongoClient();
    await client.connect(MONGO_URL);

    console.log('Connected to MongoDB')
    return client;
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    throw err;
  }
}

const connection = await connectToMongo();
export default connection;
