const Course = require('../models/Course.model')
const mongoose = require('mongoose')

const uploadCourse = async(details)=>{
  try{
    const course = new Course(details)
    await course.save()
    return course
  }catch(err){
    console.log(err);
    return {error:"error in uploadCourse services",statuscode:500}
  }
}

const  updateCourse = async(id,details)=>{
  try{
    const update = await Course.findByIdAndUpdate(
      id,
      { $set: details },
      { new: true }
    )

    return update

  }catch(err){
    console.log(err);
    return {error:"error in updateCourse services",statuscode:500}
  }
}



const deleteCourse = async(id)=>{
  try{
    const deletedData = await Course.findByIdAndDelete(id)
    return deletedData._id

  }catch(err){
    console.log(err);
    return {error:"error in deleteCourse services",statuscode:500}
  } 
}


const fetchCourses =  async(tutorId)=>{
  try{

    if (!mongoose.Types.ObjectId.isValid(tutorId)) {
      return { error: "Invalid ID format",statuscode:409 };
    }

    
    const data = await Course.find({tutorId:tutorId}).sort({ createdAt: -1 });


    if(!data){
      return {error:"no data found in this id",statuscode:404}
    }

    return data

  }catch(err){
    console.log(err);
    return {error:"error in fetchCourses services",statuscode:500}
  } 
}

module.exports = {
  uploadCourse,
  updateCourse,
  deleteCourse,
  fetchCourses
}