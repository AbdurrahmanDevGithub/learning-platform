const express = require("express")
const router = express.Router()

const userController = require('../controllers/User.controller')


//Account creation
router.post("/signup",userController.signup)
router.post("/signin", userController.signin);


module.exports = router


