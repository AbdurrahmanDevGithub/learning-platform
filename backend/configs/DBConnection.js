const mongoose = require("mongoose")
require('dotenv').config()

const MONGO_URI = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster1.0gle3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`

const dbconnect = async()=>{
  try{
    mongoose.connect(MONGO_URI)
    console.log("Database connected successfully");
  }catch(error){
    console.log("Error in database connection",error);
  }
}

module.exports = dbconnect
