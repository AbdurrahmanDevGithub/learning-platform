const courseServices = require('../services/Course.services')

const controller = {
  fetchCourseById:async(req,res)=>{
    try{
      const {id} = req.params;
      const data = await courseServices.fetchCourseById(id)
      res.json({data})
    }catch(error){
      console.log(err);
      res.json({"err":"error in  fetchCourse controller"})
    }
  },

  enrollCourse:async(req,res)=>{
    try{
      //res.json({"msg":"succsessss"})
      const id = req.user.id;
      const email = req.user.email;
      const username = req.user.username;
      const {cid,tutorid,category} = req.params;

      const user = await courseServices.enrollCourse(id,email,username,cid,tutorid,category)
      if(user.error){
        return res.status(user.statuscode || 500) .json({error:user.error})
      }
      return res.status(201).json(user);  
      
    }catch(error){
      console.log(error);
      return res.status(500).json({"err":error})
    }
  },

  fetchAllCourses:async(req,res)=>{
    try{
      const {category}= req.params;
      const data = await courseServices.fetchAllCourses(category);
      if(data.error){
        return res.status(data.statuscode || 500) .json({error:data.error})
      }
      return res.status(201).json(data);
    }catch(error){
      console.log(error);
      return res.status(500).json({"err":error})
    }
  }
}

module.exports = controller