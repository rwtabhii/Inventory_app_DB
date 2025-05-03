import {users} from "../user/user-model.js";
 export  const basicAuth = (req, res, next) => {
    // 1. check if authorization header is empty
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).send("No Authorization Found");
    }
    console.log(authHeader);

    // 2. extract the Credentials
    const base64Credential = authHeader.replace("Basic","");
    console.log(base64Credential);

    // 3. decode the credentials
    const decodeCred = Buffer.from(base64Credential,"base64").toString("utf-8")
    console.log(decodeCred);

    const cred = decodeCred.split(":");

    const user = users.find(u=> u.email==cred[0]&& u.password==cred[1]);
    if(user){
        next();
    }else{
        return res.status(400).send("Invalid Credential")
    }

     
}