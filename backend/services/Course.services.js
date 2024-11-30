const Course = require('../models/Course.model')

const fetchCourseById=async(id)=>{
  try{
    if(!id){
      return ({error:"id not fund to fetch data"})
    }
  
    const data = await Course.findById({_id:id})
   
    if(!data){
      return ({"msg":"there is no data stored in this id"})
    }
    
    return data;
   
  }catch(error){
    console.log(error);
    return({error:"error in fetchCourseById services"})
  }
}

module.exports = {
  fetchCourseById
}