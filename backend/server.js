const express = require("express")
const app = express()
const cors = require('cors');
require('dotenv').config()
const dbconnect = require('./configs/DBConnection')


const routes = require('./routes/index.routes')
// const tutorRoutes = require('./routes/Tutor.routes');

app.use(cors({
<<<<<<< HEAD
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
=======
  origin: 'http://localhost:5173', // Allow requests from this frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include DELETE method
  allowedHeaders: ['Content-Type', 'Authorization'], // Include necessary headers
>>>>>>> 6cdab3c9d6622846213f6e51a9e11ac1279caae6
}));


app.use(express.json())

//Database connection
dbconnect()

 app.use("/api", routes);
//  app.use("/api/tutor",tutorRoutes);


app.listen(process.env.PORT,()=>{
  console.log(`server runs on port ${process.env.PORT}`);
})