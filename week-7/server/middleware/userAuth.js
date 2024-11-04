const jwt = require("jsonwebtoken");
const {JWT_USER_SECRET} = require("../config/config")

const userAuth = (req, res, next)=>{
    const token = req.header['authorization'].split(' ')[1];
    if(!token){
        return res.status(401).json({
            msg: "No token provided"
        })
    }

    try{
        const decoded = jwt.verify(token,JWT_USER_SECRET );
        if(decoded){
            req.userId = decoded.id;;
            next();
        } else{
            return res.status(401).json({
                msg: "Not signed in"
            })
        }
    }catch(err){
        return res.status(500).json({
            msg: "Internal server error" + err
        })
    }
} 

module.exports = userAuth;