import jwt from "jsonwebtoken";
const jwtAuth = (req, res, next) => {
    //  1. read token
    const token = req.headers["authorization"];
    // 2. if no token return the error
    if (!token) {
        return res.status(401).send("user is unauthorized");
    }

    // 3. check if token is valid
    try {
       const payload =  jwt.verify(token, process.env.JWT_SECRET);
       console.log(payload);
    } catch (err) {
        console.log(err);
        return res.status(401).send("Unauthorization");
    }

    return next();



}

export default jwtAuth;