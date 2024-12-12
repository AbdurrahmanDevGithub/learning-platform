const User = require('../models/User.model')
const authMiddleware = require('../middleware/Authorization')



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


const signin = async(email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { status: false, msg: "Invalid email" }; 
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return { status: false, msg: "Invalid password" }; 
    }

    const token = await authMiddleware.generateToken(user);
    return { status: true, user, token }; 
  } catch (error) {
    console.error(error);
    return { status: false, msg: "Something went wrong" }; 
  }
};



module.exports = {
  signup,
  signin
}