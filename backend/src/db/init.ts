import { MONGO_URL } from "../config.ts";
import { MongoClient } from '../deps.ts';

const connect = async () => {
  console.log('Trying DB connection..')
  const client = new MongoClient();
  await client.connect(MONGO_URL);
  console.log('Connected to MongoDB')
  return client;
}

async function connectToMongo(): Promise<MongoClient> {
  try {
    return await connect();
  } catch (err) {
    console.error("Error connecting to MongoDB, restarting in 5s", err);
    await new Promise(resolve => setTimeout(resolve, 5000));
    return await connect();
  }
}

const connection = await connectToMongo();
  
export default connection;
