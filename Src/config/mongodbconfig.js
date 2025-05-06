import { MongoClient } from "mongodb";
let client;
export const connectToDb = async()=>{
    try{
     const clientInstance = await MongoClient.connect(process.env.DB_URL);
      client = clientInstance;
      console.log("MongoDB connected successfully");
    }
    catch(err){
    console.log("MongoDB didnot connected",err);
    }
}

export  const getDb =()=>{
  return client.db();
}
export const transactionSession =()=>{
  return client;
}