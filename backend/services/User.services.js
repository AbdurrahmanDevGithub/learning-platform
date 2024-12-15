const User = require('../models/User.model')
const authMiddleware = require('../middleware/Authorization')



const signup = async(username,email,password,role)=>{
  try{
    const emailIsTaken = await User.emailIsTaken(email)
    if(emailIsTaken){
      return {error:"Email is already taken",statuscode:409}
    }

    const newUser = new User({username,email,password,role})
    const user= await newUser.save()
    return user

  }catch(error){
    console.log("error in signup services",error);
    return {error:"error in signup services",statuscode:500} 
  }
}


const signin = async(email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, msg: "Invalid email", statuscode: 409 }; 
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return { success: false, msg: "Invalid password", statuscode: 409 }; 
    }

    const token = await authMiddleware.generateToken(user);
    return { success: true, user, token }; 
  } catch (error) {
    console.error(error);
    return { success: false, msg: "Something went wrong", statuscode: 500 }; 
  }
};



module.exports = {
  signup,
  signin
}