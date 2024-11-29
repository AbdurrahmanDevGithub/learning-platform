const express = require('express');
const router = express.Router();

//Routes
const userRoutes = require('./User.routes')
const tutorRoutes = require('./Tutor.routes')
const corseRoutes = require('./Course.routes')

const routes = [
  {
    path:'/account',
    route:userRoutes
  },
  {
    path:'/tutor',
    route:tutorRoutes
  },
  {
    path:'/course',
    route:corseRoutes
  }
]


routes.forEach((route)=>{
  router.use(route.path,route.route)
})


module.exports = router