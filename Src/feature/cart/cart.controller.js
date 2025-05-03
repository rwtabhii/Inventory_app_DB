import { cartModel } from "./cart.model.js";

export class cartController {

    getItems(req, res) {
        const userId = req.userid;
        const items = cartModel.get(userId);
        console.log(items)
        return res.status(200).send(items);


    }

    addItem(req, res) {
        const userId = req.userid;
        // console.log(userId)
        // console.log(req.body)
        cartModel.add(req.body, userId);
        return res.status(201).send("Cart is Updated");
    }

        deleteItem(req, res) {
            const userId = req.userid;
            const cartId = req.params.id;
            const item = cartModel.delete(userId,cartId);
            if (item) {
                return res.status(200).send("deletion successfully");
            }
            else {
                return res.status(404).send("Item not Found")
            }


    }



}