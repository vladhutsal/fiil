import { MONGO_URL } from "../../env/env.ts";
import { MongoClient } from '../deps.ts';

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function connectToMongo(): Promise<MongoClient> {
  try {
    console.log('Connecting to DB..')

    const client = new MongoClient();
    await client.connect(MONGO_URL);

    console.log('Connected to MongoDB')
    return client;
  } catch (err) {
    console.error("Error connecting to MongoDB, restarting in 5s", err);
    await timeout(5000);
    const client = new MongoClient();
    await client.connect(MONGO_URL);
    return client;
  }
}

const connection = await connectToMongo();
  
export default connection;
