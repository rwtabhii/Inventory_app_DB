import { ApplicationError } from '../middlware/errorHandling.js';
import { getDb } from '../../db.js';
import { ObjectId } from 'mongodb';

export class cartRepo {
    constructor(db) {
        this.db = db;
        this.collection = db.collection('cart');
    }
    async getItems(userId) {
        try {
            const db = getDb()
            const collection = db.collection('cart')
            const items = await collection.find({ userid: userId }).toArray();
            return items;
        } catch (err) {
            throw new ApplicationError("Database not Found", 500)
        }
    }
    async addItem(productId, quantity, userId) {
        try {
            const db = getDb()
            const collection = db.collection('cart')
            const result = await collection.updateOne(
                {
                    userId: new ObjectId(userId), productId: new ObjectId(productId)
                },{
                    $inc :{
                        quantity: quantity
                    }
                },{$upsert : true});
            return result;
        }
        catch (err) {
            throw new ApplicationError("Database not Found", 500)
        }
    }
    async deleteItem(userId, cartId) {
        const db = getDb();
        const collection = db.collection("cart")
        const result = await collection.deleteOne({ userid: userId, _id: new ObjectId(cartId) });
        if (result.deletedCount === 0) {
            throw new ApplicationError('Item not found', 404);
        }
        return true;
    }
}