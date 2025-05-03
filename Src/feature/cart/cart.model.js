export class cartModel {
    constructor(id, productid, userid, quantity) {
            this.id = id,
            this.productid = productid,
            this.userid = userid,
            this.quantity = quantity
    }

    static get(userId) {
        console.log(userId);        
        const items = cartItems.filter(i => userId === i.userid);
        console.log(items)
        return items;


    }
    static add(data, userid) {
        const { productid, quantity } = data;
        const item = new cartModel(cartItems.length + 1, productid, userid, quantity);
        // console.log(item);
        cartItems.push(item);
        return item;

    }
    static delete(userId, cartId) {
        const itemIndex = cartItems.findIndex(i => i.userid == userId && i.id == cartId);
    
        if (itemIndex === -1) {  
            return false;  
        } else {
            cartItems.splice(itemIndex, 1);
            return true;  
        }
    }

}

let cartItems = [];