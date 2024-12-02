const jwt = require('jsonwebtoken')
require('dotenv').config()


const generateToken = async(user)=>{
  try{
    const email = user.email;
    const username = user.username;
    const id = user._id;
    const role = user.role;
    const payload = {email,username,id,role}
    const token = jwt.sign(payload,process.env.SECRATE_KEY,{ expiresIn: '1d' })
    return token
  }catch(error){
    console.log("error in token generate");
    return {error:"error in token generate",error}
  }
}

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    // console.log("Authorization Header:", authHeader);

    const token = authHeader && authHeader.split(' ')[1];
    // console.log("Token:", token);

    if (!token){
      if (req.originalUrl === '/api/course/enrollcourse') {
        console.log("User is trying to enroll in a course but is not logged in.");
        return res.status(400).json({ message: "You need to login first to enroll in a course." });
      }
      return res.status(401).json("Unauthorized user");
    } 

    jwt.verify(token, process.env.SECRATE_KEY, (err, user) => {
      if (err) {
        console.log("JWT Verification Error:", err);
        return res.status(403).json("Invalid token");
      }

      req.user = user;
      // console.log("Decoded user:", req.user); // Log the decoded user to ensure it's correct
      
      next();
    });
  } catch (error) {
    console.log("Error in verifyToken:", error);
    res.status(500).json("Server error");
  }
};



module.exports ={
  generateToken,
  verifyToken
}