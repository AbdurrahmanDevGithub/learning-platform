const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const dbconnect = require("./configs/DBConnection");
const bodyParser = require("body-parser");
const routes = require("./routes/index.routes");
const path = require("path");
const loadCSVData = require("./Utilitys/CSV");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use("/image", express.static(path.join(__dirname, "/Public/Uploads/Images")));
app.use("/video", express.static(path.join(__dirname, "/Public/Uploads/Videos")));

app.use(express.json());

dbconnect().then(() => {
  console.log("Database connected");
  loadCSVData();
});

app.use("/uploads", express.static("uploads"));

app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log(`Server runs on port ${process.env.PORT}`);
});
