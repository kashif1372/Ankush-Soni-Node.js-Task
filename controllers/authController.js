const bcrypt=require('bcrypt')
const User=require('../models/User');
const {generateAccesToken,generateRefreshToken}=require('../utils/jwtUtils');

const login=async(req,res)=>{
    const {email,password}=req.body;

    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({error: "Invalid Credentials"});
        }
        
        const pass=await bcrypt.compare(password,user.password);
        if(!pass){
            return res.status(401).json({error: "Invalid Credentials"});
        }

        const accessToken=generateAccesToken(user._id);
        const refreshToken=generateRefreshToken(user._id);

        res.json({accessToken,refreshToken});

    }catch(err){
        console.error(err);
        res.status(500).json({error: "Internal Server Error"});
    }
};

module.exports={login};
    