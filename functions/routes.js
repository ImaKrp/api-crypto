const express = require("express");
const userController = require("./controllers/userController.js");
const router = express.Router();

router.get("/", (_, res) => {
  res.send("App is running..");
});

router.post("/register", new userController().create);
router.post("/authenticate", new userController().authenticate);

module.exports.router = router;
