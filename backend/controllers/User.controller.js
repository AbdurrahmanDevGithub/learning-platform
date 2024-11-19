const userServices = require('../services/User.services')
const User = require('../models/User.model')



const Controller = {
  signup: async(req,res)=>{
    try{
      const {username,email,password,role} = req.body;
      const newUser = await userServices.signup(username,email,password,role) 
      res.json({newUser})
    }catch(err){
      res.json({"error":"error in signup controller"})
      console.log(err);
    }
  },

  signin:async(req,res)=>{
    try{
      const {email,password} = req.body
      const user = await userServices.signin(email,password)
      // const token = await authMiddleware.generateToken(user)
      res.json(user)
      
    }catch(err){
      res.json({"error":"error in signin controller"})
      console.log(err);
    }
  },

  roleTest:async(req,res)=>{
    try{
      const role = req.user.role
      return res.json({"msg":role})
    }catch(err){
      res.json({"error":"error in roleTest controller"})
      console.log(err);
    }
  }
}

module.exports = Controller