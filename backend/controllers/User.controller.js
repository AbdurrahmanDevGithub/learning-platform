const userServices = require('../services/User.services')
const User = require('../models/User.model')



const Controller = {
  signup: async(req,res)=>{
    try{
      const {username,email,password,role} = req.body;
      const newUser = await userServices.signup(username,email,password,role)
      if(newUser.error){
        return res.status(newUser.statuscode || 500) .json({error:newUser.error})
      }
      res.status(201).json({newUser})
    }catch(err){
      console.log(err);
      return res.status(500).json({"error":"error in signup controller"})
    }
  },

  signin:async(req,res)=>{
    try{
      const {email,password} = req.body
      const user = await userServices.signin(email,password)
      // const token = await authMiddleware.generateToken(user)
      if(user.error){
        return res.status(user.statuscode || 500).json({error:user.error})
      }
      res.status(201).json(user)
      
    }catch(err){
      console.log(err);
      return res.status(500) .json({"error":"error in signin controller"})
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