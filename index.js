const express = require("express");
const app = express();

const path = require("path");
const logger = require("morgan");
const cors = require("cors");
require('./routes/middlewares/mongo');
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.set('jwt', "ebeb1a5ada5cf38bfc2b49ed5b3100e0");

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