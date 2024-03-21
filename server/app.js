if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require('express')
const app = express();
const port = process.env.PORT || 4001;
const router = require("./routers/index");

const cors = require('cors');
app.use(cors())


// json parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Count Me In");
});

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app