const authorizeRoles = (...allowedRoles)=>{
  return(req,res,next)=>{
    try{
      if(!allowedRoles.includes(req.user.role)){
        return res.status(403) .json({message:"Access denied"})
      }
      next();
    }catch(err){
      console.log(err);
      res.json({"amsg":err})
    }
    
  }
}

module.exports = {authorizeRoles}