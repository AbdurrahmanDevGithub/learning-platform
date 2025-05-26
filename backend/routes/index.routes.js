const express = require('express');
const router = express.Router();

//Routes
const userRoutes = require('./User.routes')
const tutorRoutes = require('./Tutor.routes')
const courseRoutes = require('./Course.routes')
const accountRoutes = require('./Account.routes')


const routes = [
  {
    path:'/account',
    route:accountRoutes
  },
  {
    path:'/user',
    route:userRoutes
  },
  {
    path:'/tutor',
    route:tutorRoutes
  },
  {
    path:'/course',
    route:courseRoutes
  }
]



routes.forEach((route)=>{
  router.use(route.path,route.route)
})


module.exports = router