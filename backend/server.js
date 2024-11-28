const express = require("express")
const app = express()
const cors = require('cors');
require('dotenv').config()
const dbconnect = require('./configs/DBConnection')
// const routes = require('./routes/User.routes')
const routes = require('./routes/index.routes')

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));


app.use(express.json())

//Database connection
dbconnect()

app.use("/api", routes);


app.listen(process.env.PORT,()=>{
  console.log(`server runs on port ${process.env.PORT}`);
})