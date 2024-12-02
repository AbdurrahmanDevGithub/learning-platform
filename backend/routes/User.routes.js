const express = require("express")
const router = express.Router()


const authMiddleware = require('../middleware/Authorization')


const roleMiddleware = require('../middleware/RoleMiddleware')
const corseController = require('../controllers/Courses.controller')

// //Account creation
// router.post("/signup",userController.signup)
// router.post("/signin", userController.signin);


router.get('/enrollcourse',authMiddleware.verifyToken,roleMiddleware.authorizeRoles("tutor","user"),corseController.rrr);





module.exports = router