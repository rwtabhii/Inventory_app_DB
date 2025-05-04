import { userModel } from "./user-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userRepository } from "./user.repository.js";


export class userController {
   constructor() {
      this.userRepo = new userRepository()
   }

   async signup(req, res) {
      const { name, email, password } = req.body;
      const hashPassword = await bcrypt.hash(password, 12);
      const user = userModel.signup(name, email, hashPassword);
      await this.userRepo.sigup(user);
      return res.status(201).send("user data add successfully");
   }

   async signin(req, res) {
      const { email, password } = req.body;
      const user = this.userRepo.findEmail(email);
      if (!user) {
         return res.status(400).send("Invalid Credential");
      } else {

         const result = await bcrypt.compare(password, user.password);
         if (result) {
            // 1. create token
            const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET  ,
               { expiresIn: "1h" });
            return res.status(201).send(token);
         }
         else{
            return res.status(400).send("Invalid Credential");
         }
      }

   }




}