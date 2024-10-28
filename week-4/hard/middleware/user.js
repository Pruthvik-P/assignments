const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

function userMiddleware(req, res, next) {
    // Implement user auth logic
    const token = req.headers['authorization'].split(' ')[1];

    if(!token){
        return res.status(401).json({ error: 'No token provided'});
    }

    jwt.verify(token,SECRET_KEY,(err, decode)=>{
        if(err){
            return res.status(401).json({ error: 'Invalid token'});
        }
        req.user = decode;
        next();
    })
}

module.exports = userMiddleware;