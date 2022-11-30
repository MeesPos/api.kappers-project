import express from "express";
import controller from "../controllers/index";
const router = express.Router();

router.get("/", controller.getIndex);

router.post("/login", controller.login);
router.post('/forgot-password', controller.sendMail)

router.post('/reset-password', controller.resetPassword)

export = router;