
import express from "express";
import { cartController } from "./cart.controller.js";

const cartcontroller = new cartController();
const cartRouter = express.Router();


cartRouter.get("/", cartcontroller.getItems);
cartRouter.post("/",cartcontroller.addItem);
cartRouter.delete("/:id",cartcontroller.deleteItem);



export default cartRouter;
