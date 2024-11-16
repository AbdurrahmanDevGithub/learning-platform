const express = require("express")
const app = express()
require('dotenv').config()
const dbconnect = require('./configs/DBConnection')
const routes = require('./routes/User.routes')


app.use(express.json())

//Database connection
dbconnect()

app.use("/api",routes)


app.listen(process.env.PORT,()=>{
  console.log(`server runs on port ${process.env.PORT}`);
})