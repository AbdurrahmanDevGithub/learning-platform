const User = require('../models/User.model')



const signup = async(username,email,password,role)=>{
  try{
    const emailIsTaken = await User.emailIsTaken(email)
    if(emailIsTaken){
      return {error:"Email is already taken'"}
    }

    const newUser = new User({username,email,password,role})
    const user= await newUser.save()
    return user

  }catch(error){
    console.log("error in signup services",error);
    throw error
  }
}

const signin = async(email,password)=>{
  try{
    const user = await User.findOne({email})
    if(!user){
      return {error:"invalid Email"}
    }

    if(!await user.comparePassword(password)){
      return {error:"invalid password"}
    }

    const username = user.username

    console.log(username, 'logged success');
    return user;
    // return {username,"msg":"Successfully logged in"}
    
  }catch(error){
    
  }
}

module.exports = {
  signup,
  signin
}