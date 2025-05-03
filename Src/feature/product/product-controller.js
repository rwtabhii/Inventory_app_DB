import ProductModel from "./product-model.js";
export class productController {
    getAllProduct(req, res) {
        const products = ProductModel.getAllProducts();
        return res.status(200).send(products);
    }

    getOneProduct(req, res) {
        const id = req.params.id;
        const product = ProductModel.findProduct(id);
        if (!product) {
            return res.status(404).send("Product  not found");
        }
        else {
            return res.status(200).send(product)
        }
    }

    addProduct(req, res) {
        ProductModel.addProduct(req.body);
        const products = ProductModel.getAllProducts()
        return res.status(201).send(products);
    }

    filterProduct(req, res) {
        console.log(req.query);
        const maxPrice = parseFloat(req.query.maxprice); // Ensure it's a number
        const minPrice = parseFloat(req.query.minprice); // Ensure it's a number

        if (isNaN(maxPrice) || isNaN(minPrice)) {
            return res.status(400).send({ error: 'Invalid price values' });
        }

        const result = ProductModel.filter(minPrice, maxPrice);
        return res.status(200).send(result);
    }

    rating(req, res) {
        const error = ProductModel.rateProduct(req.body);
        if (error) {
            return res.status(400).send(error);
        } else {
            return res.status(201).send("rating added  successfully")
        }

    }



}