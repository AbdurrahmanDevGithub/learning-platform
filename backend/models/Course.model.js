const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: [
      "Engineering",
      "Technology",
      "Business",
      "Art and Design",
      "Health and Wellness",
      "Personal Development",
      "Languages",
      "Science and Mathematics",
      "Humanities",
      "Music",
      "Programming",
      "Marketing",
      "Finance and Accounting",
      "Photography",
      "Cooking",
      "Psychology",
      "History",
      "Sports and Fitness",
      "Writing and Literature",
      "Education",
    ],
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  tutor: {
    type: String,
    required: true,
    trim: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  image: {
    type:String,
    required:true  
  },

  video: {
    type:String,
    required:true
  },

  tutorId:{
    type: mongoose.Schema.Types.ObjectId,
    required:true
  },
  
},{ timestamps: true });

const Course = mongoose.model("courses", courseSchema);

module.exports = Course;
