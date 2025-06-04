const express = require("express")
const router = express.Router()


const authMiddleware = require('../middleware/Authorization')


const roleMiddleware = require('../middleware/RoleMiddleware')
const courseController = require('../controllers/Courses.controller')

// //Account creation
// router.post("/signup",userController.signup)
// router.post("/signin", userController.signin);


router.post('/enrollcourse/:cid/:tutorid/:category',authMiddleware.verifyToken,roleMiddleware.authorizeRoles("tutor","user"),courseController.enrollCourse);
router.get('/mycourses',authMiddleware.verifyToken,roleMiddleware.authorizeRoles("tutor","user"),courseController.fetchMyCourses)

module.exports = router