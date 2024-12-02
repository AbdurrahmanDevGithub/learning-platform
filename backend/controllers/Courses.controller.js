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
  rrr:async(req,res)=>{
    try{
      res.json({"msg":"succsessss"})
    }catch(error){
      console.log(err);
      res.json({"err":err})
    }
  },

  fetchAllCourses:async(req,res)=>{
    try{
      const {category}= req.params;
      const data = await courseServices.fetchAllCourses(category);
      return res.json(data);
    }catch(error){
      console.log(err);
      res.json({"err":err})
    }
  }
}

module.exports = controller