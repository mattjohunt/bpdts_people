const express = require("express");
const bodyParser = require("body-parser");

const people = require("./routes/people");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/people", people);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
