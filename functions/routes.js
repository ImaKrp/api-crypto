import { Router } from "express";
import userController from "./controllers/userController.js";
const router = Router();

router.get("/", (_, res) => {
  res.send("App is running..");
});

router.post("/register", new userController().create);
router.post("/authenticate", new userController().authenticate);

export default router;
