const express = require("express");
const getUserPermission = require("./middlewares/getUserPermission.js");
const ensureAuthenticated = require("./middlewares/ensureAuthenticated.js");
const isAuthenticated = require("./middlewares/isAuthenticated.js");
const userController = require("./controllers/userController.js");
const router = express.Router();

router.get("/", (_, res) => {
  res.send("App is running..");
});

router.get(
  "/username/availability",
  isAuthenticated,
  new userController().username
);
router.post("/register", new userController().create);
router.post("/authenticate", new userController().authenticate);
router.get(
  "/users/list",
  ensureAuthenticated,
  getUserPermission,
  new userController().listAll
);
router.put("/user/update", ensureAuthenticated, new userController().update);

module.exports.router = router;
