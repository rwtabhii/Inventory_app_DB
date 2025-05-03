import {users} from "../user/user-model.js";
export default class ProductModel {

    constructor(id, name, desc, price, imageUrl,rating,category) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.imageUrl = imageUrl;
        this.rating = rating;
        this.category = category;
    }
    // To Get the Products
    static getAllProducts() {
        return products;
    }

    static findProduct(id) {
        const product = products.find(p => p.id == id);
        return product;

    }

    static addProduct(data) {
        const newProduct = new ProductModel(
            products.length + 1,
            data.name,
            data.desc,
            data.price,
            data.imageUrl
        );
        console.log(newProduct);
        return products.push(newProduct);

    }

    static filter(minPrice, maxPrice) {
        // console.log("Min Price:", minPrice);
        // console.log("Max Price:", maxPrice);
    
        const result = products.filter(product => {
            return product.price >= minPrice && product.price <= maxPrice; // Correct price comparison
        });
    
        return result;
    }

    static rateProduct(data) {
        const { userid, productid, rating } = data;
        console.log('rateProduct called with data:', data);
    
        // Find the user
        const user = users.find(u => u.id == userid);
        if (!user) {
            console.log("User not found");
            return "User not found";  // Return error message
        }
    
        // Find the product
        const product = products.find(p => p.id == productid);
        if (!product) {
            console.log("Product not found");
            return "Product not found";  // Return error message
        }
    
        // Check if the product has ratings, if not initialize an empty array
        if (!product.rating) {
            console.log("Initializing rating array for product");
            product.rating = [];
            product.rating.push({ userid: userid, rating: rating });
        }
    
        // If the product already has ratings, update the user's rating
        const existingRatingProduct = product.rating.findIndex(r => r.userid == userid);
        if (existingRatingProduct >= 0) {
            console.log(`Updating rating for user ${userid}`);
            product.rating[existingRatingProduct] = { userid: userid, rating: rating };
        } else {
            console.log(`Adding new rating for user ${userid}`);
            // Add the rating if the user hasn't rated before
            product.rating.push({ userid: userid, rating: rating });
        }
    
        console.log("Rating processed successfully for product:", product);
        return null;  // No error, rating was successfully added or updated
    }
    
}


var products = [
    new ProductModel(
        1,
        'Product 1',
        'Description for Product 1',
        19,
        'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
        null,
        null,
    ),
    new ProductModel(
        2,
        'Product 2',
        'Description for Product 2',
        29,
        'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
        null,
        null,
    ),
    new ProductModel(
        3,
        'Product 3',
        'Description for Product 3',
        39.99,
        'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
        null,
        null,
    ),
    new ProductModel(
        4,
        'Product 4',
        'Description for Product 4',
        34.99,
        'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
        null,
        null,
    ),
    new ProductModel(
        5,
        'Product 5',
        'Description for Product 5',
        39,
        'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
        null,
        null,
    ),
]