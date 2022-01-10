const express = require("express");
const cors = require("cors");
require("dotenv").config();
const rateLimit = require("express-rate-limit");

const PORT = process.env.PORT || 5000;

const app = express();

//set public folder
app.use(express.static("public"));

//set rate limiter
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 mins
  max: 10,
});

//use rate limiter
app.use(limiter);
app.set("trusted proxy", 1);

//use cors
app.use(cors());

app.use("/api", require("./routes"));

app.listen(PORT, () => console.log("Server started..."));
