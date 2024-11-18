const express = require('express');
const router = express.Router();

//Routes
const userRoutes = require('./User.routes')

const tutorRoutes = require('./Tutor.routes')

const routes = [
  {
    path:'/account',
    route:userRoutes
  },
  {
    path:'/tutor',
    route:tutorRoutes
  }
]


routes.forEach((route)=>{
  router.use(route.path,route.route)
})

module.exports = router