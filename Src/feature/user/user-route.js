import express from "express";
import { userController } from "./user-controller.js";


const userRouter = express.Router();
const usercontroller = new userController();


userRouter.post("/signup",(req,res)=>{
    usercontroller.signup(req,res);
});
userRouter.post("/signin",(req,res)=>{
    usercontroller.signin(req,res);
});


export default userRouter;