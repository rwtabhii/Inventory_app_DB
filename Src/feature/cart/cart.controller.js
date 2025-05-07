import { cartModel } from "./cart.model.js";
import { cartRepo } from "./cart.repository.js";

export class cartController {
    constructor(){
        this.cartrepo = new cartRepo();
    }

    async getItems(req, res) {
        const userId = req.userid;
        const items =  await this.cartrepo.getItems(userId);
        console.log(items)
        return res.status(200).send(items);


    }

    async addItem(req, res) {
        const userId = req.userid;
        const{productId,quantity} = req.body;
        // console.log(userId)
        // console.log(req.body)
        await this.cartrepo.addItem(productId,quantity, userId);
        return res.status(201).send("Cart is Updated");
    }

       async deleteItem(req, res) {
            const userId = req.userid;
            const cartId = req.params.id;
            const item =  await this.cartrepo.deleteItem(userId,cartId);
            if (item) {
                return res.status(200).send("deletion successfully");
            }
            else {
                return res.status(404).send("Item not Found")
            }


    }



}