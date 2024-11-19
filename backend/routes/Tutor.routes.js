const express = require("express")
const router = express.Router()


const authMiddleware = require('../middleware/Authorization')
const roleMiddleware = require('../middleware/RoleMiddleware')
const tutorController = require('../controllers/Tutor.controller')
const multer = require('../configs/Multer');




//upload course
router.post("/uploadcourse",authMiddleware.verifyToken,roleMiddleware.authorizeRoles("tutor"),multer.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 },
]),tutorController.uploadCourse)


module.exports = router