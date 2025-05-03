import express from "express";
import { productController } from "./product-controller.js";
import { basicAuth } from "../middlware/basicauthentication.js";


const productRouter = express.Router();

const productcontroller = new productController();
productRouter.get("/filter",productcontroller.filterProduct);
productRouter.get("/",productcontroller.getAllProduct);
productRouter.get("/:id",productcontroller.getOneProduct);
productRouter.post("/",productcontroller.addProduct);
productRouter.post("/rating",productcontroller.rating)



export default  productRouter;
