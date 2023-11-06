const express=require("express");
const authController=require("../controllers/authController")
const { refreshToken } = require('../utils/jwtUtils');

const router=express.Router();

router.post('/login',authController.login);

router.post('/refresh-token',refreshToken)

module.exports=router;