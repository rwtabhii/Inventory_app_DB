import express from "express";
import { userController } from "./user-controller.js";


const userRouter = express.Router();
const usercontroller = new userController();


userRouter.post("/signup",usercontroller.signup);
userRouter.post("/signin",usercontroller.signin);


export default userRouter;