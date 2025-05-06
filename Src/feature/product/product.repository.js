import { ObjectId } from "mongodb";
import { getDb } from "../../config/mongodbconfig.js"
import { ApplicationError } from "../middlware/errorHandling.js"
import { transactionSession } from "../../config/mongodbconfig.js";

export class productRepo {
    constructor() {
        this.collectionName = "products"
    }
    async getAllProducts() {
        try {
            const db = getDb();
            const collection = db.collection(this.collectionName);
            return await collection.find().toArray();
        }
        catch (err) {
            throw new ApplicationError("something went wrong with the server", 500);
        }
    }
    async getOneProduct(id) {
        try {
            const db = getDb();
            const collection = db.collection(this.collectionName);
            return await collection.findOne({ _id: new ObjectId(id) });

        }
        catch (err) {
            throw new ApplicationError("something went wrong with the server", 500);
        }
    }
    async addOneProduct(data) {
        let { name, desc, price, imageUrl, rating, category } = data;
        const db = getDb();
        const collection = db.collection(this.collectionName);
        return await collection.insertOne({ name, desc, price, imageUrl, rating, category });
    }
    async filterProduct(maxPrice, minPrice, category) {
        try {
            const db = getDb();
            const collection = db.collection(this.collectionName);
            let filter = {};
            if (maxPrice) {
                filter.price = { $lte: maxPrice };
            }
            if (minPrice) {
                filter.price = { ...filter.price, $gte: minPrice };
            }
            if (category) {
                filter.category = category;
            }
            console.log(filter);
            return await collection.find(filter).toArray();
        }
        catch (err) {
            throw new ApplicationError("something went wrong with the server", 500);
        }
    }
    async ratings(userid, productid, rating) {
        // using transaction avoid the race condition //
        try {
            const session = client.startSession();
            const db = getDb();
            const collection = db.collection(this.collectionName);
            session.startTransaction();
            // 1 atomic operation
            await collection.updateOne({ _id: new ObjectId(productid) },
                {
                    $pull: {
                        rating: {
                            userid: new ObjectId(userid)
                        }
                    }

                }, { session });
            //    2nd atomic operation
             await collection.updateOne({ _id: new ObjectId(productid) },
                {
                    $push: {
                        rating: {
                            userid: new ObjectId(userid),
                            ratings: parseFloat(rating)
                        }
                    }

                }, { session });
            session.commitTransaction();
            session.endSession(); 
            return {success : true}   

        } catch (err) {
             await session.abortTransaction();
             session.endSession();
            throw new ApplicationError("something went wrong with the server", 500);
        }
    }
}