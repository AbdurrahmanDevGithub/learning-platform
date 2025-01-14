const courseServices = require('../services/Course.services')
const mongoose = require('mongoose');


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
      // const image = req.body.image
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
  },

  fetchMyCourses:async(req,res)=>{
    try{
      const user_id = req.user.id;
      if(!user_id){
        return res.status(404).json({error:"id not found"})
      }
      const data = await courseServices.fetchMyCourses(user_id)
      if(data.error){
        return res.status(data.statuscode || 500) .json({error:data.error})
      }
      // console.log(data);
      return res.status(201).json(data.courses)
    }catch(error){
      console.log(error);
      return res.status(500).json({"err":error})
    }
  },


  viewCourseDetails: async (req, res) => {
  try {
    const { course_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(course_id)) {
      return res.status(400).json({ error: "Invalid course ID format" });
    }

    console.log(course_id,"helllloooo");

    const details = await courseServices.viewCourseDetails(course_id);
    if (details.error) {
      return res.status(details.statuscode).json({ error: details.error });
    }

    return res.status(details.statuscode).json(details.details);
  } catch (error) {
    console.log(error, "Error in viewCourseDetails controller");
    return res.status(500).json({ error: "Internal server error" });
  }
}

}

module.exports = controller