const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const auth = require("./src/routes/auth");
const modbike = require("./src/routes/modbike");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(auth);
app.use(modbike);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listen on ${port}`);
});
