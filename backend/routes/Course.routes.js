const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/Authorization')
const roleMiddleware = require('../middleware/RoleMiddleware')
const corseController = require('../controllers/Courses.controller')

// const tutorController = require('../controllers/Tutor.controller')
// const multer = require('../configs/Multer');


//corse fetch by id
router.get('/fetchcourse/:id',corseController.fetchCourseById)
router.get('/enrollcourse',authMiddleware.verifyToken,roleMiddleware.authorizeRoles("tutor","user"),corseController.rrr)


module.exports = router