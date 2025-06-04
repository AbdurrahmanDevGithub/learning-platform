const mongoose = require('mongoose')
const validator = require('validator')


const enrollmentSchema = mongoose.Schema({
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    required:true
  },
  course_id:{
    type: mongoose.Schema.Types.ObjectId,
    required:true
  },
  tutor_id:{
    type: mongoose.Schema.Types.ObjectId,
    required:true
  },
  user_email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email');
      }
    }
  },
  username:{
    type:String,
    required:true
  },
  course_category:{
    type:String,
    required:true
  },
  // course_name:{
  //   type:String,
  // },
  // enrolled_date:{
  //   type:Date,
  //   default:Date.now
  // }
})


const Enrollment = mongoose.model("Enrollment",enrollmentSchema)

module.exports = Enrollment