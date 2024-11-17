const express = require("express")
const router = express.Router()


const userController = require('../controllers/User.controller')
const authMiddleware = require('../middleware/Authorization')



//Account creation
router.post("/signup",userController.signup)
router.post("/signin",userController.signin)


module.exports = router