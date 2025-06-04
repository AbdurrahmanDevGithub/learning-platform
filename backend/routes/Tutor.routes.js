const express = require("express")
const router = express.Router()


const authMiddleware = require('../middleware/Authorization')
const roleMiddleware = require('../middleware/RoleMiddleware')
const tutorController = require('../controllers/Tutor.controller')
const upload = require('../configs/Multer');


//upload course
router.post("/uploadcourse",authMiddleware.verifyToken,roleMiddleware.authorizeRoles("tutor"),upload.fields([
  { name: 'image', maxCount: 1 }, 
  { name: 'video', maxCount: 1 }  
]),tutorController.uploadCourse)


//update course
router.put('/updatecourse/:id',authMiddleware.verifyToken,roleMiddleware.authorizeRoles("tutor"),upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 },
]),tutorController.updateCourse)

//delete course
router.delete('/deletecourse/:id',authMiddleware.verifyToken,roleMiddleware.authorizeRoles("tutor"),tutorController.deleteCourse)

//fetch all uploaded courses
router.get('/fetchallcourses',authMiddleware.verifyToken,roleMiddleware.authorizeRoles("tutor"),tutorController.fetchCourses)



module.exports = router