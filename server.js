import "./dotenv.js"
import express from "express";
import productRouter from "./Src/feature/product/product-route.js";
import userRouter from "./Src/feature/user/user-route.js"
import cartRouter from "./Src/feature/cart/cart.route.js";
// import { basicAuth } from "./feature/src/middlware/basicauthentication.js";
import jwtAuth from "./Src/feature/middlware/jwtAuthentication.js";
import swagger from "swagger-ui-express";
import cors from "cors";
// import apidocs from "./ApiDocs/swagger.json" assert {type : "json"};   // if it doesnotwork do another one down below//
import fs from "fs";
import loggerMiddleware from "./Src/feature/middlware/logger.middleware.js";
import { ApplicationError } from "./Src/feature/middlware/errorHandling.js";






const server = express();
// setting up CORS
// server.use((req,res,next)=>{
//     //1. for allowing resurces for domain//
//     res.header("Access-Control-Allow-Origin","http://localhost:5200");
//     // 2.res.header field authorization is not allowed by ACAO in priflight request 
//     res.header("Access-Control-Allow-Origin","content-type: Authorization");
//     // 3. now we are setting which method can client access
//     res.header("Access-Control-Allow-Origin","*");
//     // 4. error that this doesnot have a ok status setting the status 
//     if(req.method == "OPTIONS"){
//         return res.sendStatus(200);
//     }
// })

// USING CORS liberary
// setting up CORS
const corsOption = {
    origin: "http://localhost:5200",
    allowedHeaders: "*"
};
server.use(cors(corsOption));

server.use(express.json());
const apidocs = JSON.parse(fs.readFileSync("./ApiDocs/swagger3.0.json", "utf8"));
server.use("/api-docs", swagger.serve, swagger.setup(apidocs));
server.use(loggerMiddleware);
server.use("/api/products", jwtAuth, productRouter);
server.use("/api/user", userRouter);
server.use("/api/cart",jwtAuth,cartRouter);


// error handling middleware
server.use((err,req,res,next)=>{
    console.log(err);
    if(err instanceof ApplicationError){
        return res.status(err.code).send(err.message)
    }

    return res.status(500).send("something went wrong with the database");
})



server.listen(3200);
console.log("server is listening");