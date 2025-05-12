import { getDb } from "../../config/mongodbconfig.js";
import { productRepo } from "./product.repository.js";
export class productController {
    constructor() {
        this.productrepo = new productRepo();
    }
    async getAllProduct(req, res) {
        const products = await this.productrepo.getAllProducts();
        return res.status(200).send(products);
    }

    async getOneProduct(req, res) {
        const id = req.params.id;
        const product = await this.productrepo.getOneProduct(id);
        if (!product) {
            return res.status(404).send("Product  not found");
        }
        else {
            return res.status(200).send(product)
        }
    }

    async addProduct(req, res) {
        await this.productrepo.addOneProduct(req.body);
        return res.status(201).send("Product add successfully");
    }

    filterProduct(req, res) {
        console.log(req.query);
        const maxPrice = parseFloat(req.query.maxprice);
        const minPrice = parseFloat(req.query.minprice);
        const category = req.query.category;
        const finalProducts = this.productrepo.filterProduct(maxPrice, minPrice, category);
        if (finalProducts.length === 0) {
            return res.status(404).send("Product Not Found");
        }
        return res.status(200).send(finalProducts);
    }

    async rating(req, res) {
        const { userid, productid, rating } = req.body;
        const addRating = this.productrepo.ratings(userid, productid, rating);
        if (addRating.success) {
            return res.status(201).send("rating added  successfully");
        }
        else {
            return res.status(400).send(error);
        }

    }
    async avgCategoryProduct(req, res) {
            const result = await this.productrepo.averageProductPerCategory();
            return res.status(200).send(result);
        
    }
    async averageRating(req,res){
    const result = this.productrepo.avgRatings();
    return res.status(200).send(result);
    }

}