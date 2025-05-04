import { getDb } from "../../config/mongodbconfig.js";
import { ApplicationError } from "../middlware/errorHandling.js";


export class userRepository{
    constructor(){
        this.collectionName = "user"
    }

     async sigup(user){
        try{  const db = getDb();
              const collection = db.collection(this.collectionName);
              await collection.insertOne(user);
        }
        catch(err){
            throw new ApplicationError("something went wrong with the server",500);
        }
    }
   async  signin(){
      try{

      }
      catch(err){
        throw new ApplicationError("something went wrong with the server",500);
    }
    }
     async findEmail(email){
        try{
            const db = getDb();
            const collection = db.collection(this.collectionName);
             return await collection.findOne({email:email});

        }
        catch(err){
            throw new ApplicationError("something went wrong with the server",500);
        }
     }
}
