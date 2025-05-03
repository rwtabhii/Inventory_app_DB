import { MongoClient } from "mongodb";

let client;
export default connnectToDb = ()=>{
    try{
      const clinetInstance =  MongoClient.connect(process.env.DB_URL);
      client = clinetInstance;
      console.log("MongoDB connected successfully");
    }
    catch(err){
    console.log("MongoDB didnot connected",err);
    }
}