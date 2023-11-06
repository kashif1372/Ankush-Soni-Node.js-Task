const {verifyToken} = require('../utils/jwtUtils')

const authenticateToken=(req,res,next)=>{
    const authHeader= req.headers['authorization'];
    const token= authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.sendStatus(401).json({error: 'Access token not found'});
    }

    const decodedToken= verifyToken(token,process.env.ACCESS_TOKEN_SECRET);

    if(!decodedToken){
        return res.status(401);
    }
    req.userId=decodedToken.userId;
    next();

};

module.exports={authenticateToken};