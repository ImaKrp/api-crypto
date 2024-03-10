const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const http = require("http"); //! coment on deploy
const { router } = require("./routes.js");
require("dotenv/config");

const app = express();
app.use(express.json());
app.use(cors());

const serverHttp = http.createServer(app); //! coment on deploy
serverHttp.listen(8000, () =>
  //! coment on deploy
  console.log(`🚀  Server is running on PORT 8000`)
);
app.use(router); //! coment on deploy

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
