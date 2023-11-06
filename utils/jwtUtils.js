const jwt= require('jsonwebtoken')
const refreshTokens=[];

const generateAccesToken=(userId)=>{
    const payload={userId};
    const accessToken=jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '60m',
    });
    return accessToken;
};

const generateRefreshToken=(userId)=>{
    const payload={userId};
    const refreshToken=jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    return refreshToken;
};


const verifyToken=(token,secret)=>{
    try{
      return jwt.verify(token,secret);
    }catch (err) {

       return null;
      }
};

const refreshToken=(req,res)=>{
    const refereshToken=req.body.token;

    if(!refreshToken || !refreshToken.includes(refreshToken)){
        return res.sendStatus(403);
    }

    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
        if(err){
            return res.sendStatus(403)
        }
        const accessToken=generateAccesToken(user);

        res.json({accessToken});
    })
}

module.exports={
    generateAccesToken,
    generateRefreshToken,
    verifyToken,
    refreshToken,
};