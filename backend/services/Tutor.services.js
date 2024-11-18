const Course = require('../models/Course.model')

const uploadCourse = async(details)=>{
  try{
    const course = new Course(details)
    await course.save()
    return course
  }catch(err){
    console.log(err);
    return {error:"error in uploadCourse services"}
  }
}

module.exports = {
  uploadCourse
}