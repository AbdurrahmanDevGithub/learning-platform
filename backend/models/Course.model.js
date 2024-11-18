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
    filename: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value) {
          return /\.(jpeg|jpg|png|gif)$/i.test(value);
        },
        message: "Invalid image format. Use jpeg, jpg, png, or gif.",
      },
    },
    content: {
      type: String,
      required: true,
    },
  },

  video: {
    filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
});

const Course = mongoose.model("courses", courseSchema);

module.exports = Course;
