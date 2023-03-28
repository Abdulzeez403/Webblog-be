const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const ValidateHandler = asyncHandler((res, req, next)=>{
    let token;
    const authHeader = req.header.Authorization || req.header.Authentication;
    if(authHeader && authHeader.startWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, decode)=>{
            if(err){
                res.send(400);
                throw Error("The user is unauthorized!")
            }
            req.user = decode.user;
            next();
        })

        if(!token){
         res.send(400);
         throw Error ("The token has expired or its not found!")
        }
    }
})
module.exports = ValidateHandler;