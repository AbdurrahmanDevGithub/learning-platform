const userServices = require('../services/User.services')
const User = require('../models/User.model')

const Controller = {
  signup: async(req,res)=>{
    try{
      const {username,email,password} = req.body;
      const newUser = await userServices.signup(username,email,password) 
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
      res.json({user})
      
    }catch(err){
      res.json({"error":"error in signin controller"})
      console.log(err);
    }
  }
}

module.exports = Controller