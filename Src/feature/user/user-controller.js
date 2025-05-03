import { userModel } from "./user-model.js";
import jwt from "jsonwebtoken";


export class userController {

   signup(req, res) {
      const user = userModel.signup(req.body);
      return res.status(201).send(user);


   }

   signin(req, res) {
      const { email, password } = req.body;
      const user = userModel.signin(email, password);
      if (!user) {
         return res.status(400).send("Invalid Credentials")

      }
      else {
         // 1. create token
         const token = jwt.sign({ userId: user.id, email: user.email }, "wahnaqNcsZD8ft6jt3P7kgzPT3S6ukuk",
             { expiresIn: "1h" });
         return res.status(201).send(token);
      }

   }




}