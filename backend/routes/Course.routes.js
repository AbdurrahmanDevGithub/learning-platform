const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/Authorization')
// const roleMiddleware = require('../middleware/RoleMiddleware')

const courseController = require('../controllers/Courses.controller')

// const tutorController = require('../controllers/Tutor.controller')
// const multer = require('../configs/Multer');


//fetch all courses
router.get('/fetchallcourses/:category',courseController.fetchAllCourses)

//corse fetch by id
router.get('/fetchcourse/:id',courseController.fetchCourseById)

router.get('/coursebyrecommendation/:category',authMiddleware.verifyToken,courseController.fetchRecommandation)

router.get('/viewcoursedetails/:course_id',authMiddleware.verifyToken,courseController.viewCourseDetails)

module.exports = router