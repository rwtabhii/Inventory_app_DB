import { getDb } from "../../config/mongodbconfig.js"
import { ApplicationError } from "../middlware/errorHandling.js"

export class productRepo{
    constructor(){
        this.collectionName = "product"
    }
 async getAllProducts(){
    try{
        const db = getDb();
        const collection = db.collection(this.collectionName);
        return  await collection.find()
    }
    catch(err){
        throw new ApplicationError("something went wrong with the server",500);
    }
 }

}