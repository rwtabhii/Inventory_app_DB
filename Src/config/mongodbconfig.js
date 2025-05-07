import { MongoClient } from "mongodb";
let client;
export const connectToDb = async () => {
  try {
    const clientInstance = await MongoClient.connect(process.env.DB_URL);
    client = clientInstance;
    createIndexs(client.db())
    console.log("MongoDB connected successfully");
  }
  catch (err) {
    console.log("MongoDB didnot connected", err);
  }
}

// CreateIndexes
const createIndexs = async (db) => {
  try {
    await db.collection("products").createIndex({_id : 1});
    await db.collection("products").createIndex({price:1,category: 1});
    console.log("Indexes Created Successfully")
  }
  catch (err) {
    console.log(err);
    
  }
}

export const getDb = () => {
  return client.db();
}
export const transactionSession = () => {
  return client;
}