require('dotenv').config()
const path = require('path');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sendJsonController = require('./controllers/sendjson.controller')

app.use(express.static(path.join(__dirname, "/dist")));

// enable cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, DELETE, OPTIONS, PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Expose-Headers", "Authorization");
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/send-json", sendJsonController.sendjson)

app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist", "index.html"));
});

server = app.listen(3000);

