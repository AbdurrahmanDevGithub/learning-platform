const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
  _id: String,
  category: String,
  title: String,
  tutor:String,
  duration:Number,
  description:String,
});

const CourseCsv = mongoose.model('CourseCsv', CourseSchema);

module.exports = CourseCsv;