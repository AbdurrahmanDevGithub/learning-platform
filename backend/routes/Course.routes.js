const express = require('express')
const router = express.Router()

// const authMiddleware = require('../middleware/Authorization')
// const roleMiddleware = require('../middleware/RoleMiddleware')

const corseController = require('../controllers/Courses.controller')

// const tutorController = require('../controllers/Tutor.controller')
// const multer = require('../configs/Multer');


//fetch all courses
router.get('/fetchallcourses/:category',corseController.fetchAllCourses)

//corse fetch by id
router.get('/fetchcourse/:id',corseController.fetchCourseById)

module.exports = router