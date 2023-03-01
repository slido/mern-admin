const express = require("express");
const app = express();

const path = require("path");
const logger = require("morgan");
const cors = require("cors");
require('./routes/middlewares/mongo');
require('dotenv').config();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.set('jwt', process.env.JWT_SECRET);
console.log(process.env.JWT_SECRET)
app.use('/api', require('./routes/api'))
app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`));

module.exports = app;