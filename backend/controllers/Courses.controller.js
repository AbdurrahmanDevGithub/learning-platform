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
      return res.json(user);  
      
    }catch(error){
      console.log(error);
      res.json({"err":error})
    }
  },

  fetchAllCourses:async(req,res)=>{
    try{
      const {category}= req.params;
      const data = await courseServices.fetchAllCourses(category);
      return res.json(data);
    }catch(error){
      console.log(error);
      res.json({"err":error})
    }
  }
}

module.exports = controller