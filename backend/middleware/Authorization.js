const jwt = require('jsonwebtoken')
require('dotenv').config()


const generateToken = async(user)=>{
  try{
    const email = user.email;
    const username = user.username;
    const id = user._id;
    const role = user.role;
    const payload = {email,username,id,role}
    const token = jwt.sign(payload,process.env.SECRATE_KEY)
    return token
  }catch(error){
    console.log("error in token generate");
    return {error:"error in token generate",error}
  }
}

const verifyToken=async(req,res,next)=>{
  try{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) return res.json("anouthorized user");

    jwt.verify(token,process.env.SECRATE_KEY,(err,user)=>{
      if(err) return res.json("invalid token");

      req.user = user;
      next()
    })

  }catch(error){
    console.log("error in token verifyToken");
    return {error:"error in token verification",error}
  }
}

module.exports ={
  generateToken,
  verifyToken
}