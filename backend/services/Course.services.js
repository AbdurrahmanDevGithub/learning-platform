const Course = require('../models/Course.model')
const Enrollment = require('../models/EnrolledCorses.model')

const fetchCourseById=async(id)=>{
  try{
    if(!id){
      return ({error:"id not found to fetch data",statuscode:404})
    }
  
    const data = await Course.findById({_id:id})
   
    if(!data){
      return ({"msg":"there is no data stored in this id",statuscode:404})
    }
    
    return data;
   
  }catch(error){
    console.log(error);
    return({error:"error in fetchCourseById services",statuscode:500})
  }
}


const fetchAllCourses=async(category)=>{
  try{
    const data = await Course.find({category})
    if(!data || data.length === 0){
      return ({"msg":"No data found",statuscode:404})
    }
    return data;
  }catch(error){
    console.log(err);
    res.json({"err in fetchAllCourses services":err,statuscode:500})
  }
}


const enrollCourse=async(id,email,username,cid,tutorid,course_category)=>{
  try{
    const enrollment = new Enrollment ({
      user_id:id,
      user_email:email,
      username,
      course_id:cid,
      tutor_id:tutorid,
      course_category,
    })

    const data = await enrollment.save()
    return data;

  }catch(error){
    console.log("error in enrollCourse services",error);
    return {"error in enrollCourse services":error,statuscode:500}
  }
}

const fetchMyCourses = async(id)=>{
  try{
    const data = await Enrollment.find({user_id:id})
    if(!data){
      return ({"msg":"there is no Enrolment courses stored in this id",statuscode:404})
    }
    return data;

  }catch(error){
    console.log("error in fetchMyCourses services",error);
    return {"error in fetchMyCourses services":error,statuscode:500}
  }
}


module.exports = {
  fetchCourseById,
  fetchAllCourses,
  enrollCourse,
  fetchMyCourses
}