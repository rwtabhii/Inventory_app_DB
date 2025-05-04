import { MongoClient } from "mongodb";

let client;
export const connnectToDb = async()=>{
    try{
      client =  await MongoClient.connect(process.env.DB_URL);
      console.log("MongoDB connected successfully");
    }
    catch(err){
    console.log("MongoDB didnot connected",err);
    }
}

export  const getDb =()=>{
  return client.db();
}