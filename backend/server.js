const express = require("express")
const app = express()
const cors = require('cors');
require('dotenv').config()
const dbconnect = require('./configs/DBConnection')
const bodyParser = require('body-parser')
const routes = require('./routes/index.routes')
// const tutorRoutes = require('./routes/Tutor.routes');

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 

}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.json()); 

//Database connection
dbconnect()

app.use('/uploads', express.static('uploads'));

 app.use("/api", routes);
//  app.use("/api/tutor",tutorRoutes);


app.listen(process.env.PORT,()=>{
  console.log(`server runs on port ${process.env.PORT}`);
})